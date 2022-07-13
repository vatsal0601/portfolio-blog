import getConfig from "next/config";
import { GraphQLClient } from "graphql-request";

const { publicRuntimeConfig } = getConfig();

export const client = new GraphQLClient(
	`${publicRuntimeConfig.BACKEND_URL}/graphql`
);

export const fetcher = async ({ query, variables }) =>
	client.request(query, variables);
