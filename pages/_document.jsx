import Document, { Html, Head, Main, NextScript } from "next/document";

const getTypeOfBrowser = () => {
	const userAgent = window.navigator.userAgent;
	const browserDetails =
		userAgent.match(
			/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
		) || [];

	return browserDetails;
};

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en" className="scroll-smooth">
				<Head>
					{getTypeOfBrowser() && getTypeOfBrowser()[1] === "Firefox" && (
						<>
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
						</>
					)}
				</Head>
				<body className="relative min-h-screen pb-48 pt-24 subpixel-antialiased transition-colors duration-300 selection:bg-blue-100 dark:bg-zinc-900 dark:selection:bg-zinc-800 lg:pb-56 lg:pt-32">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
