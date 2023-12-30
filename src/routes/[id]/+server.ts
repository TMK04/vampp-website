import { delConvo } from "$server/db/convo";

export async function DELETE({ params }) {
	const id = params.id;
	console.log("DELETE", id);
	const result = await delConvo(id);
	console.log(result);

	return new Response(null, {
		status: 204
	});
}
