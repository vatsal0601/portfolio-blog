import Cors from "micro-cors";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-micro";
import { type } from "../../graphql/schema";
import { resolver } from "../../graphql/resolver";

const cors = Cors();

const apolloServer = new ApolloServer({ typeDefs: type, resolvers: resolver });
const startServer = apolloServer.start();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const database = mongoose.connection;
database.on("error", (err) => console.error(err));
database.once("open", () => console.log("Connected to Database"));

const handler = cors(async (req, res) => {
	if (req.method === "OPTIONS") {
		res.end();
		return;
	}

	await startServer;

	await apolloServer.createHandler({
		path: "/api",
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
