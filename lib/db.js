import mongoose from "mongoose";

export const connectDatabase = () => {
	if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
		mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const database = mongoose.connection;
		database.on("error", (err) => console.error(err));
		database.once("open", () => console.log("Connected to Database"));
	}
};
