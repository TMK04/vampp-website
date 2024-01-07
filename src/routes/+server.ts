import { API_ENDPOINT, OUT_DIR } from "$env/static/private";
import { REGEX_YTID } from "$lib/shared/validate";
import { FastApiError, error } from "$server/api";
import { awaitProc, spawnAndThrow } from "$server/child_process.js";
import { logError } from "$server/console.js";
import { convoExists, initConvo, selectFinishedConvos } from "$server/db/convo";
import { json } from "@sveltejs/kit";
import { createWriteStream, mkdirSync, unlink } from "fs";
import { nanoid } from "nanoid";
import internal from "stream";

export async function GET() {
	const convo_arr = await selectFinishedConvos();
	return json(convo_arr);
}

async function mkIdDir() {
	try {
		let id: string;
		do {
			id = nanoid();
		} while (await convoExists(id));
		const out_dir = `${OUT_DIR}/${id}`;
		mkdirSync(out_dir);
		return id;
	} catch (e) {
		logError(e);
		throw error(500, "Failed to create directory for convo");
	}
}

/**
 *
 * @returns [video_url, audio_url]
 */
async function ytdlpUrls(ytid: string) {
	try {
		const urls_proc = spawnAndThrow("yt-dlp", [
			"-f",
			"bv[height<=720][fps<=60]+ba",
			"-g",
			"--",
			ytid
		]);
		let urls = "";
		for await (const chunk of urls_proc.stdout) {
			urls += chunk;
		}
		return urls.trim().split("\n") as [string, string];
	} catch (e) {
		logError(e);
		throw error(500, "Failed to download YT video");
	}
}
async function ytdlpTitle(ytid: string) {
	try {
		const title_proc = spawnAndThrow("yt-dlp", [
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
		return title.trim();
	} catch (e) {
		logError(e);
		throw error(500, "Failed to get YT title");
	}
}
async function saveFileStream(file: File, tmp_path: string, mp4_path: string, wav_path: string) {
	try {
		const write_stream = createWriteStream(tmp_path);
		const read_stream = internal.Readable.fromWeb(file.stream());
		for await (const chunk of read_stream) {
			write_stream.write(chunk);
		}
		await Promise.all([
			awaitProc(saveAudio(wav_path, tmp_path)),
			awaitProc(saveVideo(mp4_path, tmp_path))
		]);
		unlink(tmp_path, (err) => {
			if (err) logError(err);
		});
	} catch (e) {
		logError(e);
		throw error(500, "Failed to save video");
	}
}
/**
 * Limit to 5 minutes
 */
const time_arg_arr = ["-t", "00:05:00"] as const;
function saveAudio(wav_path: string, i = "-") {
	try {
		const savea_proc = spawnAndThrow("ffmpeg", [
			"-i",
			i,
			...time_arg_arr,
			"-vn",
			"-c:a",
			"pcm_s16le",
			"-ac",
			"1",
			"-ar",
			"16000",
			"-b:a",
			"128k",
			wav_path
		]);
		return savea_proc;
	} catch (e) {
		logError(e);
		throw error(500, "Failed to save audio");
	}
}
function saveVideo(mp4_path: string, i = "-") {
	try {
		const savev_proc = spawnAndThrow("ffmpeg", [
			"-i",
			i,
			...time_arg_arr,
			"-an",
			"-c:v",
			"libx265",
			"-crf",
			"28",
			"-vf",
			"fps=1",
			"-f",
			"matroska",
			mp4_path
		]);
		return savev_proc;
	} catch (e) {
		logError(e);
		throw error(500, "Failed to save video");
	}
}

const size_1gb = 1024 ** 3;
/**
 * Setup this_form_data
 */
async function setupTFD(
	client_form_data: FormData,
	this_form_data: FormData,
	id: string,
	ts: number
) {
	try {
		this_form_data.set("id", id);
		this_form_data.set("ts", ts.toString());

		const topic = client_form_data.get("topic") ?? "";
		if (typeof topic !== "string") throw error(400, "Topic must be a string");
		this_form_data.set("topic", topic);

		const out_dir = `${OUT_DIR}/${id}`;
		const mp4_path = `${out_dir}/og.mp4`;
		const wav_path = `${out_dir}/og.wav`;

		const promise_arr = [];
		if (client_form_data.has("ytid")) {
			const ytid = client_form_data.get("ytid");
			if (typeof ytid !== "string") throw error(400, "YT ID must be a string");
			if (!REGEX_YTID.test(ytid)) throw error(400, `Invalid YT ID: Must match ${REGEX_YTID}`);
			if (!topic) {
				promise_arr.push(ytdlpTitle(ytid).then((title) => this_form_data.set("topic", title)));
			}

			const [video_url, audio_url] = await ytdlpUrls(ytid);
			promise_arr.push(awaitProc(saveVideo(mp4_path, video_url)));
			promise_arr.push(awaitProc(saveAudio(wav_path, audio_url)));
		} else if (client_form_data.has("video")) {
			const video = client_form_data.get("video") as File;
			if (!(video instanceof File)) throw error(400, "Video must be a file");
			// TODO: Check file type
			if (video.size > size_1gb) throw error(400, "Video must be under 1GB");

			const tmp_path = `${out_dir}/tmp.mp4`;
			promise_arr.push(saveFileStream(video, tmp_path, mp4_path, wav_path));
		} else throw error(400, "No YT ID or video file provided");

		await Promise.all(promise_arr);

		await initConvo({ id, ts });
	} catch (e) {
		logError(e);
		if (e instanceof Response) {
			throw e;
		}
		throw error(500, "Unknown error");
	}
}

export async function POST({ request }) {
	const id = await mkIdDir();
	console.info(`POST ${id}`);
	try {
		const client_form_data = await request.formData();
		const ts = Date.now();
		const this_form_data = new FormData();
		await setupTFD(client_form_data, this_form_data, id, ts);

		const controller = new AbortController();
		// 5 minutes timeout
		const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			body: this_form_data,
			signal: controller.signal
		});
		clearTimeout(timeout);

		if (!response.ok) {
			throw FastApiError(response);
		}
		const response_body = await response.json();
		response_body.id = id;
		response_body.ts = ts;
		return json(JSON.stringify(response_body));
	} catch (e) {
		if (e instanceof Response) {
			return e;
		}
		return error(500, "Unknown error");
	}
}
