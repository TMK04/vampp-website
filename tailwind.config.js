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
				secondary: "#E1E1EA",
				accent: "#F7D44C"
			},
			spacing: {
				navbar: "80px"
			}
		}
	},
	plugins: []
};
