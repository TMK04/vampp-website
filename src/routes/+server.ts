import { HOST } from "$env/static/private";
import { handleFastApiError } from "../server-helpers";

export async function GET() {
	const response = await fetch(HOST);
	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.json();
	console.log(body);
	return JSON.stringify(body);
}
