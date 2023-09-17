import { HOST, TMP_DIR, TMP_FILENAME } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { spawnSync } from "child_process";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { nanoid } from "nanoid";
import path from "path";
import { WritableStream } from "stream/web";
import { handleFastApiError } from "../server-helpers";

export async function GET() {
	const response = await fetch(HOST);
	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.json();
	return json(JSON.stringify(body));
}

export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get("file") as File | string;
	formData.delete("file");
	const file_is_ytid = typeof file === "string";

	const basename = file_is_ytid ? file : file.name.replace(/\.\w+?$/, "");
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
