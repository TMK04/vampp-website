import { readFile } from "fs/promises";
import { predict, submit } from "./utils";

export async function predictVideo(id: string, mp4_path: string) {
	const buffer = await readFile(mp4_path);
	const base64 = buffer.toString("base64");
	return submit("/predictVideo", [id, { name: mp4_path, data: base64, is_file: false }]);
}

export async function predictAudio(
	id: string,
	wav_path: string,
	pitch_topic: string,
	yt_title: string
) {
	const buffer = await readFile(wav_path);
	const base64 = buffer.toString("base64");
	return submit("/predictAudio", [
		id,
		{ name: wav_path, data: base64, is_file: false },
		pitch_topic,
		yt_title
	]);
}

export function predictScores(id: string) {
	return predict<[string]>("/predictScores", [id]);
}
