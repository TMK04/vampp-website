import { OUT_DIR } from "$env/static/private";
import { PUBLIC_STREAM_DELIMITER } from "$env/static/public";
import { SIZE_100MB } from "$lib/shared/constants";
import { REGEX_YTID } from "$lib/shared/validate";
import { error } from "$server/api";
import { awaitProc } from "$server/child_process";
import { logError } from "$server/console";
import { ConvoId, insertConvo, selectFinishedConvos } from "$server/db/convo";
import { predictAudio, predictFinal, predictVideo } from "$server/gradio/predict";
import { saveAudio, saveTmp, saveVideo } from "$server/local/save";
import { ytdlpTitle, ytdlpUrls } from "$server/local/ytdlp";
import { ReadableStreamFromReadable } from "$server/stream";
import { json } from "@sveltejs/kit";
import { mkdirSync, rm } from "fs";
import merge2, { type Merge2Stream } from "merge2";
import { join } from "path";
import { Readable, Transform } from "stream";

export async function GET() {
	const convo_arr = await selectFinishedConvos();
	for (const convo of convo_arr) {
		convo.final_video = convo.final_video.toString() as any;
	}
	return json(convo_arr as any as ConvoType);
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

	const out_dir = join(OUT_DIR, id);
	mkdirSync(out_dir);

	let client_form_data: FormData;
	try {
		client_form_data = await request.formData();
	} catch (e) {
		return error(500, "Failed to parse form data");
	}

	const pitch_topic = client_form_data.get("pitch_topic") ?? "";
	if (typeof pitch_topic !== "string") return error(400, "Topic must be a string");

	const mp4_path = join(out_dir, "og.mp4");
	const wav_path = join(out_dir, "og.wav");

	const convo = { id } as any;
	if (pitch_topic) convo.pitch_topic = pitch_topic;
	const substream_promises: Promise<Readable>[] = [];
	if (client_form_data.has("ytid")) {
		const ytid = client_form_data.get("ytid");
		if (typeof ytid !== "string") return error(400, "YT ID must be a string");
		if (!REGEX_YTID.test(ytid)) return error(400, `Invalid YT ID`);

		const [video_url, audio_url] = await ytdlpUrls(ytid);
		console.log("video_url:", video_url);
		console.log("audio_url:", audio_url);
		substream_promises.push(saveAndPredictVideo(id, mp4_path, video_url));
		if (pitch_topic) {
			substream_promises.push(saveAndPredictAudio(id, wav_path, audio_url, pitch_topic, ""));
		} else {
			substream_promises.push(
				ytdlpTitle(ytid).then(function (yt_title) {
					return saveAndPredictAudio(id, wav_path, audio_url, "", yt_title);
				})
			);
		}
	} else if (client_form_data.has("video")) {
		const video = client_form_data.get("video") as File;
		if (!(video instanceof File)) return error(400, "Video must be a file");
		// TODO: Check file type
		if (video.size > SIZE_100MB) return error(413, "Video must be under 100MB");

		const tmp_path = join(out_dir, "tmp.mp4");
		await saveTmp(video, tmp_path);
		substream_promises.push(saveAndPredictVideo(id, mp4_path, tmp_path));
		substream_promises.push(saveAndPredictAudio(id, wav_path, tmp_path, pitch_topic, ""));
	} else return error(400, "No YT ID or video file provided");

	const convo_stream = new Transform({
		objectMode: true,
		transform(chunk, encoding, callback) {
			Object.assign(convo, chunk);
			if ("final_video" in chunk) {
				delete chunk.final_video;
			}
			const data = PUBLIC_STREAM_DELIMITER + JSON.stringify(chunk);
			callback(null, data);
		}
	}).on("error", function (e) {
		logError(e);
	});
	Readable.from([convo], { objectMode: true }).pipe(convo_stream, { end: false });
	const subscores_stream = merge2({
		end: false,
		objectMode: true,
		pipeError: true
	})
		.on("queueDrain", function () {
			console.log("subscores_stream queueDrain");
		})
		.once("queueDrain", function (this: Merge2Stream) {
			this.once("queueDrain", function (this: Merge2Stream) {
				this.end();
				rm(out_dir, { force: true, recursive: true }, function (e) {
					if (e) logError(e);
				});
				insertConvo(convo).catch(function (e) {
					logError(e);
					console.log("Keys at error:", Object.keys(convo));
				});
			});

			this.add(predictFinal(id), Readable.from([{ ts: Date.now() }]));
		});
	subscores_stream.pipe(convo_stream);
	Promise.all(substream_promises)
		.then(function (substreams) {
			subscores_stream.add(substreams);
		})
		.catch(logError);

	return new Response(ReadableStreamFromReadable(convo_stream), {
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

async function saveAndPredictAudio(
	id: string,
	wav_path: string,
	i: string,
	pitch_topic: string,
	yt_title: string
) {
	await awaitProc(saveAudio(wav_path, i));
	const subscores_gen = await predictAudio(id, wav_path, pitch_topic, yt_title);
	return subscores_gen;
}
