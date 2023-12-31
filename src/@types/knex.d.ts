import { Knex } from "knex";

declare module "knex/types/tables.js" {
	interface Convo {
		id: string;
		/**
		 * Timestamp
		 */
		ts: number;
		topic: string;
		pitch: string;
		summary: string;
		/**
		 * Professionalism & Enthusiasm
		 */
		pe: number;
		clarity: number;
		/**
		 * Business Value
		 */
		bv: number;
		moving: number;
		smiling: number;
		upright: number;
		/**
		 * Eye Contact
		 */
		ec: number;
		speech_clarity: number;
		speech_enthusiasm: number;
		beholder_creativity: number;
		beholder_creativity_justification: string;
		beholder_feasibility: number;
		beholder_feasibility_justification: string;
		beholder_impact: number;
		beholder_impact_justification: string;
		beholder_clarity: number;
		beholder_clarity_justification: string;
		/**
		 * Professional Attire
		 */
		pa: bool;
	}

	interface Tables {
		convo: Convo;
		convo_composite: Knex.CompositeTableType<
			Convo,
			Pick<Convo, "id" | "ts">,
			Partial<Omit<Convo, "id">>
		>;
	}
}
