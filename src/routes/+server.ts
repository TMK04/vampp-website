import { OUT_DIR } from "$env/static/private";
import { SIZE_1GB } from "$lib/shared/constants";
import { REGEX_YTID } from "$lib/shared/validate";
import { error } from "$server/api";
import { awaitProc } from "$server/child_process";
import { logError } from "$server/console";
import { ConvoId, selectFinishedConvos } from "$server/db/convo";
import { predictAudio, predictVideo } from "$server/gradio/predict";
import { saveAudio, saveTmp, saveVideo } from "$server/local/save";
import { ytdlpTitle, ytdlpUrls } from "$server/local/ytdlp";
import { ReadableStreamFromReadable } from "$server/stream";
import { json } from "@sveltejs/kit";
import { mkdirSync } from "fs";
import merge2 from "merge2";
import type { Readable } from "stream";

export async function GET() {
	const convo_arr = await selectFinishedConvos();
	return json(convo_arr);
}

export async function POST({ request }) {
	let id: string;
	try {
		id = await ConvoId();
	} catch (e) {
		logError(e);
		return error(500, "Failed to make directory");
	}
	console.info(`POST ${id}`);

	const out_dir = `${OUT_DIR}/${id}`;
	mkdirSync(out_dir);

	let client_form_data: FormData;
	try {
		client_form_data = await request.formData();
	} catch (e) {
		return error(500, "Failed to parse form data");
	}

	const topic = client_form_data.get("topic") ?? "";
	if (typeof topic !== "string") return error(400, "Topic must be a string");

	const mp4_path = `${out_dir}/og.mp4`;
	const wav_path = `${out_dir}/og.wav`;

	const substream_promises = Array<Promise<Readable>>();
	if (client_form_data.has("ytid")) {
		const ytid = client_form_data.get("ytid");
		if (typeof ytid !== "string") return error(400, "YT ID must be a string");
		if (!REGEX_YTID.test(ytid)) return error(400, `Invalid YT ID`);

		const [video_url, audio_url] = await ytdlpUrls(ytid);
		substream_promises.push(saveAndPredictVideo(id, mp4_path, video_url));
		if (topic) {
			substream_promises.push(saveAndPredictAudio(id, wav_path, audio_url, topic));
		} else {
			substream_promises.push(
				ytdlpTitle(ytid).then(function (title) {
					return saveAndPredictAudio(id, wav_path, audio_url, title);
				})
			);
		}
	} else if (client_form_data.has("video")) {
		const video = client_form_data.get("video") as File;
		if (!(video instanceof File)) return error(400, "Video must be a file");
		// TODO: Check file type
		if (video.size > SIZE_1GB) return error(400, "Video must be under 1GB");

		const tmp_path = `${out_dir}/tmp.mp4`;
		// const saveTmp_done =
		await saveTmp(video, tmp_path);
		substream_promises.push(saveAndPredictVideo(id, mp4_path, tmp_path));
		substream_promises.push(saveAndPredictAudio(id, wav_path, tmp_path, topic));
	} else return error(400, "No YT ID or video file provided");

	const subscores_stream = merge2(await Promise.all(substream_promises), {
		end: false,
		objectMode: true
	});

	return new Response(ReadableStreamFromReadable(subscores_stream), {
		headers: {
			"Content-Type": "text/event-stream"
		}
	});
}

async function saveAndPredictVideo(id: string, mp4_path: string, i: string) {
	await awaitProc(saveVideo(mp4_path, i));
	const subscores_gen = await predictVideo(id, mp4_path);
	return subscores_gen;
}

async function saveAndPredictAudio(id: string, wav_path: string, i: string, topic: string) {
	await awaitProc(saveAudio(wav_path, i));
	const subscores_gen = await predictAudio(id, wav_path, topic);
	return subscores_gen;
}
