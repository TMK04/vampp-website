import type { Readable } from "stream";

export async function* yieldReadable(readable: Readable) {
	yield* readable;
}

export function ReadableStreamFromReadable(readable: Readable) {
	return ReadableStream.from(yieldReadable(readable));
}
