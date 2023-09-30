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
	} & ScoreType &
		CvScoreType &
		SpeechScoreType &
		BeholderScoreType &
		BeholderScoreJustificationType;

	type ObjIdConvo = Record<string, ConvoType>;
	type Id = string | null;

	namespace Dynamo {
		type StringType = {
			S: string;
		};
		type NumberType = {
			N: number;
		};
		type BooleanType = {
			BOOL: boolean;
		};
		type Type<T> = T extends string ? StringType : T extends number ? NumberType : BooleanType;
		type ObjectType<T extends object, Id extends string> = Record<Id, Dynamo.StringType> & {
			[K in keyof T]: Dynamo.Type<T[K]>;
		};
	}

	type DynamoConvoType = Dynamo.ObjectType<ConvoType, "id">;
}
