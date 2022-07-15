module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			"images.unsplash.com",
			"localhost",
			"vatsal0601-portfolio-blog.herokuapp.com",
			"res.cloudinary.com",
		],
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
