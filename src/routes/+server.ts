import { AWS_DYNAMO_TABLE, HOST, TMP_DIR, TMP_FILENAME } from "$env/static/private";
import { handleFastApiError } from "$lib/server/api";
import { attributesExist, dynamo_client } from "$lib/server/aws";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { json } from "@sveltejs/kit";
import { spawnSync } from "child_process";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { nanoid } from "nanoid";
import path from "path";
import { WritableStream } from "stream/web";

export async function GET() {
	const result = await dynamo_client.send(
		new ScanCommand({
			TableName: AWS_DYNAMO_TABLE,
			FilterExpression: attributesExist(
				"ts",
				"pitch",
				"ec",
				"pa",
				"speech_clarity",
				"beholder_clarity",
				"beholder_clarity_justification",
				"pe"
			)
		})
	);
	const convo_arr = result.Items!;
	return json(convo_arr);
}

export async function POST({ request }) {
	const formData = await request.formData();
	let topic = formData.get("topic") ?? "";
	const file = formData.get("file") as File | string;

	if (!file) return json({ type: "error", title: 422, message: "file is invalid" });
	const file_is_ytid = typeof file === "string";
	const basename = file_is_ytid ? file : file.name.replace(/\.\w+?$/, "");
	formData.delete("file");

	let random: string;
	let basename_random: string;
	do {
		random = nanoid(7);
		basename_random = path.join(TMP_DIR, `${basename}-${random}`);
	} while (existsSync(basename_random));

	mkdirSync(basename_random);
	basename_random = path.join(basename_random, `${TMP_FILENAME}.mp4`);
	if (file_is_ytid) {
		spawnSync("yt-dlp", [
			"-f",
			"bv[height<=1080][fps<=60]+ba",
			"--merge-output-format",
			"mp4",
			"-o",
			basename_random,
			"--",
			file
		]);
		if (!topic) {
			topic = spawnSync("yt-dlp", [
				"--skip-download",
				"--no-warning",
				"--print",
				"title",
				"--",
				file
			])
				.stdout.toString()
				.trim();
		}
	} else {
		const read_stream = file.stream();
		const write_stream = createWriteStream(basename_random);
		const writable_stream = new WritableStream({
			write(chunk) {
				write_stream.write(chunk);
			}
		});
		await read_stream.pipeTo(writable_stream);
		write_stream.end();
	}

	formData.set("topic", topic);
	formData.append("basename", basename);
	formData.append("random", random);
	console.log("formData", formData);

	const controller = new AbortController();
	// 5 minutes timeout
	const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
	const response = await fetch(HOST, {
		method: "POST",
		body: formData,
		signal: controller.signal
	});
	clearTimeout(timeout);

	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.json();
	return json(JSON.stringify(body));
}
