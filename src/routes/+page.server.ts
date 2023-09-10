import { HOST } from "$env/static/private";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		console.log(body);
		const response = await fetch(HOST, {
			method: "POST",
			body
		});

		if (!response.ok) {
			console.error(response);
			return;
		}
		const data = await response.json();
		console.log(data);
	}
};
