import { spawnAndThrow } from "$server/child_process";

/**
 *
 * @returns [video_url, audio_url]
 */
export async function ytdlpUrls(ytid: string) {
	const urls_proc = spawnAndThrow("yt-dlp", [
		"-f",
		"bv*[height<=720][fps<=60]+ba/b[height<=720][fps<=60] / wv*+ba/w",
		"-g",
		"--",
		ytid
	]);
	let urls = "";
	for await (const chunk of urls_proc.stdout) {
		urls += chunk;
	}
	return urls.trim().split("\n") as [string, string];
}
export async function ytdlpTitle(ytid: string) {
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
}
