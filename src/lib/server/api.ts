import { json } from "@sveltejs/kit";

export function error(status: number, message: string) {
	return json({ type: "error", title: status.toString(), message });
}

export async function handleFastApiError(response: Response) {
	console.error(response);
	const body = await response
		.json()
		.then((data) => data["detail"])
		.catch(() => response.statusText);
	return error(response.status, body);
}
