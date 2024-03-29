import { nanoid } from "nanoid";
import db from "./db";

const ConvoId_max_tries = 3;
export async function ConvoId() {
	let id = nanoid();
	let convo_exists;
	let remaining_tries = ConvoId_max_tries;
	do {
		id = nanoid();
		convo_exists = await convoExists(id);
	} while (convo_exists && remaining_tries--);
	return id;
}

export function selectFinishedConvos() {
	return db("convo").select("*");
}

export async function convoExists(id: string) {
	const row = await db("convo").where({ id }).select("id").first();
	return row !== undefined;
}

export function insertConvo({ final_video, ...convo }: ConvoType) {
	return db("convo").insert({ ...convo, final_video: Buffer.from(final_video) });
}

export function delConvo(id: DbConvoType["id"]) {
	return db("convo").where({ id }).del();
}

async function main() {
	const convo_exists = await db.schema.hasTable("convo");
	if (!convo_exists) {
		await db.schema.createTable("convo", (table) => {
			table.specificType("id", "CHAR(21)").primary().notNullable(); // https://www.npmjs.com/package/nanoid#:~:text=from%C2%A036%C2%A0to-,21%C2%A0symbols,-.
			table.integer("ts").unsigned().notNullable();
			table.string("pitch_topic", 100); // https://boldcontentvideo.com/2018/01/24/optimise-youtube-title-description-tags/#:~:text=YouTube%20Video%20Title,for%20your%20title
			table.text("pitch_content");
			table.text("pitch_summary");
			table.float("pe").unsigned();
			table.float("clarity").unsigned();
			table.float("bv").unsigned();
			table.float("moving").unsigned();
			table.float("smiling").unsigned();
			table.float("upright").unsigned();
			table.float("ec").unsigned();
			table.float("speech_clarity").unsigned();
			table.float("speech_enthusiasm").unsigned();
			table.float("pitch_Creativity").unsigned();
			table.text("pitch_Creativity_justification");
			table.float("pitch_Feasibility").unsigned();
			table.text("pitch_Feasibility_justification");
			table.float("pitch_Impact").unsigned();
			table.text("pitch_Impact_justification");
			table.float("pitch_Clarity").unsigned();
			table.text("pitch_Clarity_justification");
			table.boolean("pa");
			table.binary("final_video");
		});
	}
}

main();
