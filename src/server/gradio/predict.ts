import { readFile } from "fs/promises";
import { submit, type GradioFile } from "./utils";

export async function predictVideo(id: string, mp4_path: string) {
	const buffer = await readFile(mp4_path);
	const base64 = buffer.toString("base64");
	const file: GradioFile = { name: mp4_path, data: base64, is_file: false };

	console.info("/predictVideo");
	return submit(true, "/predictVideo", [id, file]);
}

export async function predictAudio(
	id: string,
	wav_path: string,
	pitch_topic: string,
	yt_title: string
) {
	const buffer = await readFile(wav_path);
	const base64 = buffer.toString("base64");
	const file: GradioFile = { name: wav_path, data: base64, is_file: false };

	console.info("/predictAudio");
	return submit(true, "/predictAudio", [id, file, pitch_topic, yt_title]);
}

export function predictFinal(id: string) {
	console.info("/predictFinal");
	return submit(true, "/predictFinal", [id]);
}
