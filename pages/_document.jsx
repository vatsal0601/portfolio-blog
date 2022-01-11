import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en" className="scroll-smooth">
				<Head />
				<body className="min-h-screen relative pb-48 lg:pb-56 pt-24 lg:pt-32 dark:bg-zinc-900 transition-colors duration-300 subpixel-antialiased">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
