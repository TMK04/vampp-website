import { spawn, type ChildProcessWithoutNullStreams } from "child_process";
import { logError } from "./console";

export function spawnAndThrow(child_name: string, args: string[]) {
	const child = spawn(child_name, args);
	let err = "";
	child.on("error", (e) => {
		err += e.message;
	});
	child.on("exit", (code) => {
		if (code) {
			logError(`${child_name} exited with code ${code}: ${err}`);
		}
	});
	return child;
}

export async function awaitProc(proc: ChildProcessWithoutNullStreams) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
	for await (const _ of proc.stdout) {
	}
}
