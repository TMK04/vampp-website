import { HOST } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { handleFastApiError } from "../server-helpers";

export async function GET() {
	const response = await fetch(HOST);
	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.json();
	return json(JSON.stringify(body));
}
