/**
 * From https://webapps.stackexchange.com/a/101153
 */
const REGEX_YTID = /^[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]$/;

export function castYtIds(ytids_str: string) {
	const ytid_arr: string[] = [];
	ytids_str = ytids_str.trim();
	if (ytids_str === "") return { ytid_arr };
	// Trim here to remove trailing "\n"
	const temp_ytid_arr = ytids_str.trim().split("\n");
	for (let i = temp_ytid_arr.length; i--; ) {
		// Trim here to remove leading & trailing spaces
		const ytid = temp_ytid_arr[i].trim();
		if (REGEX_YTID.test(ytid)) ytid_arr.push(ytid);
	}
	return { ytid_arr };
}
