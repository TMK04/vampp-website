import { HOST } from "$env/static/private";
import { handleFastApiError } from "../../server-helpers.js";

export async function DELETE({ params }) {
	const id = params.id;
	const response = await fetch(`${HOST}/${id}`, {
		method: "DELETE"
	});
	if (!response.ok) {
		await handleFastApiError(response);
	}
	const body = await response.text();
	return new Response(body);
}
