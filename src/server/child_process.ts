import { spawn } from "child_process";

export async function spawnAndThrow(child_name: string, args: string[]) {
	const child = spawn(child_name, args);
	let err = "";
	for await (const chunk of child.stderr) {
		err += chunk;
	}
	const exit_code = await new Promise<number>((resolve) => {
		child.on("exit", resolve);
	});
	if (exit_code) {
		throw new Error(`${child_name} exited with code ${child.exitCode}\n${err}`);
	}
	return child;
}
