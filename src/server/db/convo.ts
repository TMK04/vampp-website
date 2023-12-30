import db from "./db";

const finished_attr_arr = [
	"ts",
	"pitch",
	"ec",
	"pa",
	"speech_clarity",
	"beholder_clarity",
	"beholder_clarity_justification",
	"pe"
];

export function selectFinishedConvos() {
	let query = db("convo");
	for (const attr of finished_attr_arr) {
		query = query.whereNotNull(attr);
	}
	return query;
}

export function delConvo(id: string) {
	return db("convo").where({ id }).del();
}

async function main() {
	const convo_exists = await db.schema.hasTable("convo");
	if (!convo_exists) {
		await db.schema.createTable("convo", (table) => {
			table.string("id").primary().notNullable();
			table.integer("ts").notNullable();
			table.string("topic").notNullable();
			table.string("pitch").notNullable();
			table.string("summary").notNullable();
			table.float("pe");
			table.float("clarity");
			table.float("bv");
			table.float("moving");
			table.float("smiling");
			table.float("upright");
			table.float("ec");
			table.float("speech_clarity");
			table.float("speech_enthusiasm");
			table.float("beholder_creativity");
			table.string("beholder_creativity_justification");
			table.float("beholder_feasibility");
			table.string("beholder_feasibility_justification");
			table.float("beholder_impact");
			table.string("beholder_impact_justification");
			table.float("beholder_clarity");
			table.string("beholder_clarity_justification");
			table.boolean("pa");
		});
	}
}

main();
