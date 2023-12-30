/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			text: "#010d1e",
			background: "#ffffff",
			"background-fade": "#fcfcff",
			"background-dark": "#1A1A1A",
			primary: "#6b15c1",
			"primary-light": "#7E19E3",
			secondary: "#939399",
			"secondary-dark": "#6D6D73",
			border: "#E1E1EA",
			"border-dark": "#4E4E52",
			accent: "#E3A03B",
			light: "#F5F5FF",
			dark: "#18181A",
			white: "#ffffff",
			error: "#FA1414",
			"error-dark": "#CC1010",
			success: "#12DB4B",
			warning: "#FA9214",
			info: "#19E3C5",
			transparent: "transparent"
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"]
		},
		extend: {
			spacing: {
				navbar: "72px"
			}
		}
	},
	plugins: []
};

module.exports = config;
