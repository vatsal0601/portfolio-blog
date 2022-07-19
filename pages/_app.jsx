import "../styles/tailwind.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import ScrollButton from "@components/BackToTop";
import Script from "next/script";
import Head from "next/head";
import { useState, useEffect } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@lib/gqlClient";

const App = ({ Component, pageProps }) => {
	const [isFirefox, setIsFirefox] = useState(false);

	useEffect(() => {
		const userAgent = window.navigator.userAgent;
		const browserDetails =
			userAgent.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
			) || [];

		if (browserDetails[1] === "Firefox") setIsFirefox(true);
	}, []);

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>

			<Script strategy="afterInteractive" id="google-analytics">
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

			{isFirefox && (
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
			)}

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
