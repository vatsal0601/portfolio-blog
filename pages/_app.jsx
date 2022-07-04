import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import ScrollButton from "@components/BackToTop";
import "../styles/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apolloClient";

const App = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Navbar />
			<ScrollButton />
			<Component {...pageProps} />
			<Footer />
		</ApolloProvider>
	);
};

export default App;
