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
	type PitchScoreType = {
		pitch_Creativity: number;
		pitch_Feasibility: number;
		pitch_Impact: number;
		pitch_Clarity: number;
	};
	type PitchScoreJustificationType = {
		[key in keyof PitchScoreType as `${key}_justification`]: string;
	};
	type ConvoType = {
		/**
		 * Timestamp
		 */
		ts: number;
		pitch_topic: string;
		pitch_content: string;
		pitch_summary: string;
	} & ScoreType &
		CvScoreType &
		SpeechScoreType &
		PitchScoreType &
		PitchScoreJustificationType;
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
