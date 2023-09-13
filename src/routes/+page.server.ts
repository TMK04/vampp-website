import { HOST } from "$env/static/private";
import type { Actions } from "@sveltejs/kit";
import { handleFastApiError } from "../server-helpers";

export const actions: Actions = {
	receive_video: async ({ request }) => {
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
		console.log(body);
		return JSON.stringify(body);
	}
};
