export {};

declare global {
	type Score = {
		pe: number;
		clarity: number;
		bv: number;
	};
	type CvScore = {
		moving: number;
		smiling: number;
		upright: number;
		/**
		 * Eye contact
		 */
		ec: number;
		pa: boolean;
	};
	type SpeechScore = {
		speech_clarity: number;
		speech_enthusiasm: number;
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
		pitch: string;
	} & Score &
		CvScore &
		SpeechScore &
		BeholderScore &
		BeholderScoreJustification;

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

	type DynamoConversation = Dynamo.ObjectType<Conversation, "id">;
}
