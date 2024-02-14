import { delConvo } from "$server/db/convo";

export async function DELETE({ params }) {
	const { id } = params;
	console.info("DELETE", id);
	const result = await delConvo(id);
	console.info(result);

	return new Response(null, {
		status: 204
	});
}
