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
				secondary: "#9F9FA6",
				border: "#E1E1EA",
				accent: "#E3A03B",
				light: "#F5F5FF"
			},
			spacing: {
				navbar: "80px"
			}
		}
	},
	plugins: []
};
