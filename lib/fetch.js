export const fetchData = async (query) => {
	try {
		const results = await fetch(process.env.BACKEND_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
		});
		const data = await results.json();
		return data.data;
	} catch (err) {
		return err.message;
	}
};
