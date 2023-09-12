import { HOST } from "$env/static/private";
import { error, type Actions } from "@sveltejs/kit";

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
			const body = await response
				.json()
				.then((data) => data["detail"])
				.catch(() => response.statusText);
			throw error(response.status, body);
		}
		const body = await response.json();
		console.log(body);
		return body;
	}
};
