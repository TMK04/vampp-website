import { json } from "@sveltejs/kit";
import { logError } from "./console";

export async function FastApiError(response: Response) {
	console.error(response);
	const body = await response
		.json()
		.then((data) => data["detail"])
		.catch(() => response.statusText);
	return error(response.status, body);
}

export function error(status: number, message: string) {
	return json({ type: "error", title: status.toString(), message });
}

export async function formData(request: Request) {
	try {
		return request.formData();
	} catch (e) {
		logError(e);
		throw error(400, "Invalid form data");
	}
}

/**
 * @param fetchFn Function that takes an AbortSignal and returns a Promise<Response> (i.e. a wrapped fetch)
 * @param ms Timeout in milliseconds
 * @example fetchWithTimeout((signal) => fetch(url, { signal }))
 */
export async function fetchWithTimeout(
	fetchFn: (signal: AbortSignal) => Promise<Response>,
	ms = 5 * 60 * 1000
) {
	const controller = new AbortController();
	// 5 minutes timeout
	const timeout = setTimeout(() => controller.abort(), ms);

	try {
		return await fetchFn(controller.signal);
	} finally {
		clearTimeout(timeout);
	}
}
