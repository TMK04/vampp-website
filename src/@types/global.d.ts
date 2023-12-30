export {};

declare global {
	type AlertTypeType = "success" | "info" | "warning" | "error";
	type AlertType = {
		type: AlertTypeType;
		title: string;
		message: string;
	};

	type ScoreType = {
		pe: number;
		clarity: number;
		bv: number;
	};
	type CvScoreType = {
		moving: number;
		smiling: number;
		upright: number;
		/**
		 * Eye contact
		 */
		ec: number;
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
		ts: number;
		topic: string;
		pitch: string;
		summary: string;
	} & ScoreType &
		CvScoreType &
		SpeechScoreType &
		BeholderScoreType &
		BeholderScoreJustificationType;

	type ObjIdConvo = Record<string, ConvoType>;
	type Id = string | null;

	type DbConvoType = {
		id: string;
	} & ConvoType;
}
