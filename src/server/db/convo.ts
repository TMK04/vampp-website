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
			table.specificType("id", "CHAR(21)").primary().notNullable(); // https://www.npmjs.com/package/nanoid#:~:text=from%C2%A036%C2%A0to-,21%C2%A0symbols,-.
			table.integer("ts").unsigned().notNullable();
			table.string("topic", 100).notNullable(); // https://boldcontentvideo.com/2018/01/24/optimise-youtube-title-description-tags/#:~:text=YouTube%20Video%20Title,for%20your%20title
			table.text("pitch").notNullable();
			table.text("summary").notNullable();
			table.float("pe").unsigned();
			table.float("clarity").unsigned();
			table.float("bv").unsigned();
			table.float("moving").unsigned();
			table.float("smiling").unsigned();
			table.float("upright").unsigned();
			table.float("ec").unsigned();
			table.float("speech_clarity").unsigned();
			table.float("speech_enthusiasm").unsigned();
			table.float("beholder_creativity").unsigned();
			table.text("beholder_creativity_justification");
			table.float("beholder_feasibility").unsigned();
			table.text("beholder_feasibility_justification");
			table.float("beholder_impact").unsigned();
			table.text("beholder_impact_justification");
			table.float("beholder_clarity").unsigned();
			table.text("beholder_clarity_justification");
			table.boolean("pa");
		});
	}
}

main();
