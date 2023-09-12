export {};

declare global {
	type Score = {
		creativity: number;
		feasibility: number;
		impact: number;
		clarity: number;
	};
	type ScoreJustification = {
		[key in keyof Score as `${key}_justification`]: string;
	};
	type Conversation = {
		topic: string;
		file: File | string;
		pitch: string;
	} & Score &
		ScoreJustification;
}
