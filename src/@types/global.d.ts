export {};

declare global {
	type Score = {
		pe: number;
		clarity: number;
		bv: number;
	};
	type BeholderScore = {
		beholder_creativity: number;
		beholder_feasibility: number;
		beholder_impact: number;
		beholder_clarity: number;
	};
	type BeholderScoreJustification = {
		[key in keyof BeholderScore as `${key}_justification`]: string;
	};
	type Conversation = {
		topic: string;
		file: File | string;
		pitch: string;
	} & Score &
		BeholderScore &
		BeholderScoreJustification;
}
