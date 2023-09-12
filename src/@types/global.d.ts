export {};

declare global {
	interface Conversation {
		id: string;
		topic: string;
		file: File | string;
	}
	type ConversationContext = Conversation | null;
}
