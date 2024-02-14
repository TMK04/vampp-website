import { XzReadableStream } from "xz-decompress";

async function decompress(uint8arr: Uint8Array): Promise<Uint8Array> {
	const readable_stream = new Blob([uint8arr]).stream();
	const xz_readable_stream = new XzReadableStream(readable_stream);
	let decompressed_uint8arr = new Uint8Array();
	const writable_stream = new WritableStream({
		write(chunk) {
			decompressed_uint8arr = new Uint8Array([...decompressed_uint8arr, ...chunk]);
		}
	});
	await xz_readable_stream.pipeTo(writable_stream);
	return decompressed_uint8arr;
}

export async function decompressVideo(base64_str: string): Promise<string> {
	const binary_str = atob(base64_str);
	const binary_l = binary_str.length;
	const uint8arr = new Uint8Array(binary_l);
	for (let i = 0; i < binary_l; i++) {
		uint8arr[i] = binary_str.charCodeAt(i);
	}

	const decompressed_uint8arr = await decompress(uint8arr);

	const decompressed = URL.createObjectURL(new Blob([decompressed_uint8arr]));
	return decompressed;
}
