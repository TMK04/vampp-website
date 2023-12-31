import { HOST, OUT_DIR } from "$env/static/private";
import { REGEX_YTID } from "$lib/shared/validate";
import { FastApiError, error } from "$server/api";
import { spawnAndThrow } from "$server/child_process.js";
import { logError } from "$server/console.js";
import { convoExists, initConvo, selectFinishedConvos } from "$server/db/convo";
import { json } from "@sveltejs/kit";
import { createWriteStream, mkdirSync, rmSync } from "fs";
import { nanoid } from "nanoid";
import { WritableStream } from "stream/web";

export async function GET() {
	const convo_arr = await selectFinishedConvos();
	return json(convo_arr);
}

async function mkIdDir(out_dir: string) {
	try {
		let id: string;
		do {
			id = nanoid();
		} while (await convoExists(id));
		mkdirSync(`${out_dir}/${id}`);
		return id;
	} catch (e) {
		logError(e);
		throw error(500, "Failed to create directory for convo");
	}
}
async function ytdlpVideo(ytid: string, out_path: string) {
	try {
		const download_proc = await spawnAndThrow("yt-dlp", [
			"-f",
			"bv[height<=1080][fps<=60]+ba",
			"--merge-output-format",
			"mkv",
			"-o",
			"-",
			"--",
			ytid
		]);
		const compress_proc = await spawnAndThrow("ffmpeg", [
			"-i",
			"-",
			"-c:a",
			"copy",
			"-c:v",
			"libx265",
			"-crf",
			"28",
			"-vf",
			"fps=1",
			"-f",
			"matroska",
			out_path
		]);

		for await (const chunk of download_proc.stdout) {
			compress_proc.stdin.write(chunk);
		}
		compress_proc.stdin.end();
	} catch (e) {
		logError(e);
		throw error(500, "Failed to download video");
	}
}
async function ytdlpTitle(ytid: string) {
	try {
		const title_proc = await spawnAndThrow("yt-dlp", [
			"--skip-download",
			"--no-warning",
			"--print",
			"title",
			"--",
			ytid
		]);
		let title = "";
		for await (const chunk of title_proc.stdout) {
			title += chunk;
		}
		title = title.trim();
		return title;
	} catch (e) {
		logError(e);
		// Empty title is fine since server can generate one
		return "";
	}
}

async function videoWrite(video: File, out_path: string) {
	try {
		const read_stream = video.stream();
		const write_stream = createWriteStream(out_path);
		const writable_stream = new WritableStream({
			write(chunk) {
				write_stream.write(chunk);
			}
		});
		await read_stream.pipeTo(writable_stream);
		write_stream.end();
	} catch (e) {
		logError(e);
		throw error(500, "Failed to write video file");
	}
}
/**
 * Setup this_form_data
 */
async function setupTFD(client_form_data: FormData, this_form_data: FormData, id: string) {
	const out_path = `${OUT_DIR}/${id}/og.mkv`;

	try {
		const topic = client_form_data.get("topic") ?? "";
		if (typeof topic !== "string") throw error(400, "Topic must be a string");
		this_form_data.set("topic", topic);

		const promise_arr = [];
		if (client_form_data.has("ytid")) {
			const ytid = client_form_data.get("ytid");
			if (typeof ytid !== "string") throw error(400, "YT ID must be a string");
			if (!REGEX_YTID.test(ytid)) throw error(400, `Invalid YT ID: Must match ${REGEX_YTID}`);

			promise_arr.push(ytdlpVideo(ytid, out_path));
			if (!topic) {
				promise_arr.push(ytdlpTitle(ytid).then((title) => this_form_data.set("topic", title)));
			}
		} else if (client_form_data.has("video")) {
			const video = client_form_data.get("video") as File;
			if (!(video instanceof File)) throw error(400, "Video must be a file");
			// TODO: Check file type

			promise_arr.push(videoWrite(video, out_path));
		} else throw error(400, "No YT ID or video file provided");

		promise_arr.push(initConvo(id));

		await Promise.all(promise_arr);
	} catch (e) {
		logError(e);
		rmSync(id, { recursive: true, force: true });
		if (e instanceof Response) {
			throw e;
		}
		throw error(500, "Unknown error");
	}
}

export async function POST({ request }) {
	try {
		const client_form_data = await request.formData();
		const id = await mkIdDir(OUT_DIR);
		await setupTFD(client_form_data, client_form_data, id);

		const this_form_data = new FormData();
		this_form_data.set("id", id);

		console.info(`POST ${id}`);
		const controller = new AbortController();
		// 5 minutes timeout
		const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
		const response = await fetch(HOST, {
			method: "POST",
			body: this_form_data,
			signal: controller.signal
		});
		clearTimeout(timeout);

		if (!response.ok) {
			throw FastApiError(response);
		}
		const response_body = await response.json();
		return json(JSON.stringify(response_body));
	} catch (e) {
		if (e instanceof Response) {
			return e;
		}
		return error(500, "Unknown error");
	}
}
