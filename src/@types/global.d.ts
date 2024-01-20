import type * as streamWeb from "node:stream/web";

export {};

declare global {
	type AlertTypeType = "success" | "info" | "warning" | "error";
	type AlertType = {
		type: AlertTypeType;
		title: string;
		message: string;
	};

	type ScoreType = {
		/**
		 * Professionalism & Enthusiasm
		 */
		pe: number;
		clarity: number;
		/**
		 * Business Value
		 */
		bv: number;
	};
	type CvScoreType = {
		moving: number;
		smiling: number;
		upright: number;
		/**
		 * Eye Contact
		 */
		ec: number;
		/**
		 * Professional Attire
		 */
		pa: boolean;
	};
	type SpeechScoreType = {
		speech_clarity: number;
		speech_enthusiasm: number;
	};
	type BeholderScoreType = {
		beholder_creativity: number;
		beholder_feasibility: number;
		beholder_impact: number;
		beholder_clarity: number;
	};
	type BeholderScoreJustificationType = {
		[key in keyof BeholderScoreType as `${key}_justification`]: string;
	};
	type ConvoType = {
		/**
		 * Timestamp
		 */
		ts: number;
		topic: string;
		pitch: string;
		summary: string;
	} & ScoreType &
		CvScoreType &
		SpeechScoreType &
		BeholderScoreType &
		BeholderScoreJustificationType;
	type ConvoKey = keyof ConvoType;

	type ObjIdConvo = Record<string, ConvoType>;
	type Id = string | null;

	type DbConvoType = {
		id: string;
	} & ConvoType;

	interface Blob {
		stream(): streamWeb.ReadableStream<Uint8Array>;
	}
}
