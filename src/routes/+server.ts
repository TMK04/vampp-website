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

export async function POST({ request }) {
	const formData = await request.formData();
	console.log(formData);
	const controller = new AbortController();
	// 5 minutes timeout
	const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
	const response = await fetch(HOST, {
		method: "POST",
		body: formData,
		signal: controller.signal
	});
	clearTimeout(timeout);

	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.json();
	return json(JSON.stringify(body));
}
