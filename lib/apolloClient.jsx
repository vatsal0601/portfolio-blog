import getConfig from "next/config";
import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const { publicRuntimeConfig } = getConfig();
let apolloClient;

export const useApollo = (initialState) => {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
};

export const initializeApollo = (initialState = null) => {
	const _apolloClient = apolloClient ?? createApolloClient();

	if (initialState) {
		const existingCache = _apolloClient.extract();
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	if (typeof window === "undefined") return _apolloClient;

	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
};

const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: new HttpLink({
			uri: `${publicRuntimeConfig.BACKEND_URL}/graphql`,
		}),
		cache: new InMemoryCache(),
	});
};
