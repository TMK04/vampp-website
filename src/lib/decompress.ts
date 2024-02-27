import { logError } from "$server/console";
import LZMA from "lzma-web";

async function decompress(uint8arr: Uint8Array) {
	const lzma = new LZMA();
	const decompressed = await lzma.decompress(uint8arr);
	return decompressed;
}

export async function decompressVideo(base64_str: string): Promise<string> {
	try {
		const uint8arr = base64ToUint8Arr(base64_str);

		const decompressed = await decompress(uint8arr);
		console.log("decompressed", decompressed);

		if (decompressed instanceof Uint8Array) {
			const decompressed_str = URL.createObjectURL(new Blob([decompressed]));
			return decompressed_str;
		}
		return decompressed;
	} catch (e) {
		logError(e);
		return "";
	}
}

function base64ToUint8Arr(base64_str: string): Uint8Array {
	const binary_str = atob(base64_str);
	const binary_l = binary_str.length;
	const uint8arr = new Uint8Array(binary_l);
	for (let i = 0; i < binary_l; i++) {
		uint8arr[i] = binary_str.charCodeAt(i);
	}
	return uint8arr;
}
