/**
 * From https://webapps.stackexchange.com/a/101153
 */
export const REGEX_YTID = /[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]/;

export function castYtIdArr(temp_ytid_arr: string[]) {
	const ytid_arr: string[] = [];
	const error_i_arr: number[] = [];
	for (let i = temp_ytid_arr.length; i--; ) {
		// Trim here to remove leading & trailing spaces
		const ytid = temp_ytid_arr[i].trim();
		const ytid_match = ytid.match(REGEX_YTID);
		if (ytid_match) ytid_arr.push(ytid_match[0]);
		else error_i_arr.push(i + 1); // Human-readable index
	}
	return { ytid_arr, error_i_arr };
}

export function castYtIdsStr(ytids_str: string) {
	ytids_str = ytids_str.trim();
	if (ytids_str === "") return { ytid_arr: [], error_i_arr: [] };
	// Trim here to remove trailing "\n"
	const temp_ytid_arr = ytids_str.trim().split(/\s|,/);
	return castYtIdArr(temp_ytid_arr);
}

export function InvalidYtIdsMessage(error_i_arr: number[]) {
	let message = "Line";
	const errors_gt1 = error_i_arr.length > 1;
	if (errors_gt1) message += "s";
	message += ` ${error_i_arr.join(", ")} `;
	if (errors_gt1) message += "are";
	else message += "is an";
	message += " invalid YT ID";
	if (errors_gt1) message += "s";
	message += ".";
	return message;
}
