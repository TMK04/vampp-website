import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo_client = new DynamoDBClient();

export function attributesExist(...attributes: string[]) {
	let attributes_exist = `attribute_exists(${attributes.at(-1)})`;
	for (let i = attributes.length - 1; i--; ) {
		attributes_exist += ` AND attribute_exists(${attributes[i]})`;
	}
	return attributes_exist;
}
