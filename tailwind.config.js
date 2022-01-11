const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrainsMono", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	variants: {
		extend: {
			textColor: ["active"],
			backgroundColor: ["active"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
