import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";

export default function ({ mode }: ConfigEnv) {
	process.env = Object.assign(process.env, loadEnv(mode, process.cwd()), "");
	return defineConfig({
		plugins: [sveltekit()],
		server: {
			host: process.env.VITE_HOST,
			port: +(process.env.VITE_PORT ?? 8001),
			strictPort: true,
			cors: {
				origin: process.env.VITE_PROXY_ENDPOINT,
				credentials: true,
				methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
			}
		}
	});
}
