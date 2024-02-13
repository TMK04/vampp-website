import { spawnAndThrow } from "$server/child_process";
import { logError } from "$server/console";
import { createWriteStream, unlink } from "fs";
import { Readable } from "stream";

export async function saveTmp(file: File, tmp_path: string, done_n = 2) {
	const write_stream = createWriteStream(tmp_path);
	const read_stream = Readable.fromWeb(file.stream());
	for await (const chunk of read_stream) {
		write_stream.write(chunk);
	}
	return function done() {
		console.info("saveTmp done in", done_n);
		if (--done_n) return;

		unlink(tmp_path, (err) => {
			if (err) logError(err);
		});
	};
}
/**
 * Limit to 5 minutes
 */
const time_arg_arr = ["-t", "00:05:00"] as const;
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
		"-c:v",
		"libx265",
		"-crf",
		"28",
		"-vf",
		"fps=1,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:-1:-1",
		"-f",
		"matroska",
		mp4_path
	]);
	return savev_proc;
}
