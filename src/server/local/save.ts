import { spawnAndThrow } from "$server/child_process";
import { writeFile } from "fs/promises";

export async function saveTmp(blob: Blob, tmp_path: string) {
	const array_buffer = await blob.arrayBuffer();
	await writeFile(tmp_path, Buffer.from(array_buffer));
}
/**
 * Limit to 10 minutes
 */
const time_arg_arr = ["-t", "00:10:00"] as const;
export function saveAudio(wav_path: string, i = "-") {
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
}
export function saveVideo(mp4_path: string, i = "-") {
	const savev_proc = spawnAndThrow("ffmpeg", [
		"-i",
		i,
		...time_arg_arr,
		"-an",
		"-vf",
		"fps=1,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:-1:-1",
		"-c:v",
		"libx265",
		"-crf",
		"28",
		mp4_path
	]);
	return savev_proc;
}
