import { PUBLIC_STREAM_DELIMITER } from "$env/static/public";
import { Readable } from "stream";
import gradio from "./gradio";

export function submit(...args: Parameters<typeof gradio.submit>) {
	const result = gradio.submit(...args);
	const stream = new Readable({ objectMode: true, read() {} });

	result.on("data", (ev) => {
		const data = ev.data[0] as string;
		console.log("data", data);
		stream.push(PUBLIC_STREAM_DELIMITER + data);
	});
	result.on("log", (ev) => {
		console.info("log", ev.log);
	});
	result.on("status", (ev) => {
		console.info("status", ev.stage);
		switch (ev.stage) {
			case "error":
				console.error("error", "Gradio error");
			// eslint-disable-next-line no-fallthrough
			case "complete":
				// Close readable
				stream.emit("end");
				break;
		}
	});

	return stream;
}

export async function predict<T extends Array<any>>(...args: Parameters<typeof gradio.predict>) {
	const result = (await gradio.predict(...args)) as { data: T };
	const data = result.data;
	console.info("data", data);
	return data;
}
