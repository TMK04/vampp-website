import { Readable } from "stream";
import gradio from "./gradio";

export function submit(objectMode: boolean, ...args: Parameters<typeof gradio.submit>) {
	const result = gradio.submit(...args);
	const stream = new Readable({ objectMode, read() {} });

	result.on("data", (ev) => {
		const data = ev.data[0] as string;
		stream.push(objectMode ? JSON.parse(data) : data);
	});
	result.on("log", (ev) => {
		console.info("log", ev.log);
	});
	let prev_stage = "";
	result.on("status", (ev) => {
		const stage = ev.stage;
		if (prev_stage !== stage) {
			console.info("status", stage);
			prev_stage = stage;
		}
		switch (stage) {
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
	return data;
}

export type GradioFile = {
	name: string;
	data: string;
	is_file: false;
};
