import { AWS_DYNAMO_TABLE, HOST, TMP_DIR, TMP_FILENAME } from "$env/static/private";
import { REGEX_YTID } from "$lib/shared/validate";
import { error, handleFastApiError } from "$server/api";
import { attributesExist, dynamo_client } from "$server/aws";
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

function BasenameRandom(basename: string) {
	let random: string;
	let basename_random: string;
	do {
		random = nanoid(7);
		basename_random = path.join(TMP_DIR, `${basename}-${random}`);
	} while (existsSync(basename_random));

	mkdirSync(basename_random);
	basename_random = path.join(basename_random, `${TMP_FILENAME}.mp4`);

	return { basename_random, random };
}
function PostBody(topic: string, basename: string, random: string) {
	const formData = new FormData();
	formData.append("topic", topic);
	formData.append("basename", basename);
	formData.append("random", random);
	return formData;
}

export async function POST({ request }) {
	const formData = await request.formData();

	const topic = formData.get("topic") ?? "";
	if (typeof topic !== "string") return error(422, "Topic must be a string");

	let request_body: FormData;
	if (formData.has("ytid")) {
		const basename = formData.get("ytid") as string;
		if (typeof basename !== "string") return error(422, "YT ID must be a string");
		if (!REGEX_YTID.test(basename)) return error(422, "Invalid YT ID");
		console.log("POST", basename);

		const { basename_random, random } = BasenameRandom(basename);

		spawnSync("yt-dlp", [
			"-f",
			"bv[height<=1080][fps<=60]+ba",
			"--merge-output-format",
			"mp4",
			"-o",
			basename_random,
			"--",
			basename
		]);

		request_body = PostBody(topic, basename, random);

		if (!topic) {
			const title = spawnSync("yt-dlp", [
				"--skip-download",
				"--no-warning",
				"--print",
				"title",
				"--",
				basename
			])
				.stdout.toString()
				.trim();
			if (title) request_body.append("title", title);
		}
	} else if (formData.has("video")) {
		const video = formData.get("video") as File;
		if (!(video instanceof File)) return error(422, "Video must be a file");

		const basename = video.name.replace(/\.[^.]+$/, "");
		console.log("POST", basename);
		const { basename_random, random } = BasenameRandom(basename);

		const read_stream = video.stream();
		const write_stream = createWriteStream(basename_random);
		const writable_stream = new WritableStream({
			write(chunk) {
				write_stream.write(chunk);
			}
		});
		await read_stream.pipeTo(writable_stream);
		write_stream.end();

		request_body = PostBody(topic, basename, random);
	} else return error(422, "No YT ID or video file provided");

	const controller = new AbortController();
	// 5 minutes timeout
	const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
	const response = await fetch(HOST, {
		method: "POST",
		body: request_body,
		signal: controller.signal
	});
	clearTimeout(timeout);

	if (!response.ok) {
		return handleFastApiError(response);
	}
	const response_body = await response.json();
	return json(JSON.stringify(response_body));
}
