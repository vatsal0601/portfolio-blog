const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1.25rem",
				md: "2.5rem",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrainsMono", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
