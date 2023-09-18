import { AWS_DYNAMO_TABLE } from "$env/static/private";
import { dynamo_client } from "$lib/server/aws.js";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

export async function DELETE({ params }) {
	const id = params.id;
	console.log("DELETE", id);
	const result = await dynamo_client.send(
		new DeleteItemCommand({
			TableName: AWS_DYNAMO_TABLE,
			Key: {
				id: { S: id }
			}
		})
	);
	console.log(result);

	return new Response(null, {
		status: 204
	});
}
