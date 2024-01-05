import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";

export default function ({ mode }: ConfigEnv) {
	process.env = Object.assign(process.env, loadEnv(mode, process.cwd()), "");
	return defineConfig({
		plugins: [sveltekit()]
	});
}
