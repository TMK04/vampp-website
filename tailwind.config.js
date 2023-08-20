/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			text: "#010d1e",
			background: "#ffffff",
			primary: "#6b15c1",
			"primary-light": "#7E19E3",
			secondary: "#9A9AA1",
			"secondary-dark": "#7E7E85",
			border: "#E1E1EA",
			accent: "#E3A03B",
			light: "#F5F5FF",
			white: "#ffffff",
			transparent: "transparent"
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"]
		},
		extend: {
			spacing: {
				navbar: "80px"
			}
		}
	},
	plugins: []
};
