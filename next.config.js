module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["drive.google.com", "images.unsplash.com"],
	},
	env: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	publicRuntimeConfig: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	serverRuntimeConfig: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};
