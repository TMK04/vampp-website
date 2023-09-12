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
			const body = await response
				.json()
				.then((data) => data["detail"])
				.catch(() => response.statusText);
			return { status: response.status, body };
		}
		const data = await response.json();
		console.log(data);
		return data;
	}
};
