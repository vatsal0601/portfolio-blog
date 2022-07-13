import "../styles/tailwind.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import ScrollButton from "@components/BackToTop";
import Script from "next/script";
import { SWRConfig } from "swr";
import { fetcher } from "@lib/gqlClient";

const App = ({ Component, pageProps }) => {
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

			<SWRConfig value={{ fetcher, fallback: pageProps.fallback }}>
				<Navbar />
				<ScrollButton />
				<Component {...pageProps} />
				<Footer />
			</SWRConfig>
		</>
	);
};

export default App;
