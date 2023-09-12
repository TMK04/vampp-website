import { HOST } from "$env/static/private";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
	receive_video: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);
		const response = await fetch(HOST, {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			console.error(response);
			return;
		}
		const data = await response.json();
		console.log(data);
	}
};
