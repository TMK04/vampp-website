import { Knex } from "knex";

declare module "knex/types/tables" {
	type DbConvoInsertType = Pick<DbConvoType, "id" | "ts">;
	type DbConvoUpdateType = Partial<Omit<DbConvoType, "id" | "ts">>;

	interface Tables {
		convo: DbConvoType;
		convo_composite: Knex.CompositeTableType<DbConvoType, DbConvoInsertType, DbConvoUpdateType>;
	}
}
