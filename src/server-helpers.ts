import { error } from "@sveltejs/kit";

export async function handleFastApiError(response: Response) {
	console.error(response);
	const body = await response
		.json()
		.then((data) => data["detail"])
		.catch(() => response.statusText);
	throw error(response.status, body);
}
