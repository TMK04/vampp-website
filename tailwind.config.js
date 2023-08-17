/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				text: "#010d1e",
				background: "#ffffff",
				primary: "#8178fc",
				secondary: "#e3e6e8",
				accent: "#be414e"
			}
		}
	},
	plugins: []
};
