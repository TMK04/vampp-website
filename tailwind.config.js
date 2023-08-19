/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"]
		},
		extend: {
			colors: {
				text: "#010d1e",
				background: "#ffffff",
				primary: "#6b15c1",
				secondary: "#A4A4AB",
				"secondary-100": "#F2F2FC",
				accent: "#E3A03B"
			},
			spacing: {
				navbar: "80px"
			}
		}
	},
	plugins: []
};
