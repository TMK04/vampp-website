/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			text: "#010d1e",
			background: "#ffffff",
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
			error: "#F01616",
			"error-dark": "#CC1212",
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
