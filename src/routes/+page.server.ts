import { HOST } from "$env/static/private";
import { error, json, type Actions } from "@sveltejs/kit";

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
			console.error(response);
			const body = await response
				.json()
				.then((data) => data["detail"])
				.catch(() => response.statusText);
			throw error(response.status, body);
		}
		const body = await response.json();
		console.log(body);
		return json(body);
	}
};
