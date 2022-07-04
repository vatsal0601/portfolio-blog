import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import ScrollButton from "@components/BackToTop";
import Script from "next/script";
import "../styles/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apolloClient";

const App = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>

			<Script strategy="lazyOnload" id="1">
				{
					/* JavaScript */ `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
						`
				}
			</Script>

			<ApolloProvider client={apolloClient}>
				<Navbar />
				<ScrollButton />
				<Component {...pageProps} />
				<Footer />
			</ApolloProvider>
		</>
	);
};

export default App;
