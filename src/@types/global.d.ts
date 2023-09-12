export {};

declare global {
	type Conversation = {
		topic: string;
		file: File | string;
	};
}
