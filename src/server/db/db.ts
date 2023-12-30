import { OUT_DIR } from "$env/static/private";
import knex from "knex";

const db = knex({
	client: "better-sqlite3",
	connection: {
		filename: `${OUT_DIR}/db.sqlite`
	}
});

export default db;
