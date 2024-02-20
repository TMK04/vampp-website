import { OUT_DIR } from "$env/static/private";
import knex from "knex";
import { join } from "path";

const db = knex({
	client: "better-sqlite3",
	connection: {
		filename: join(OUT_DIR, "db.sqlite")
	},
	useNullAsDefault: true
});

export default db;
