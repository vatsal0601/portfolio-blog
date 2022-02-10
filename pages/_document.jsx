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
				<body className="relative min-h-screen pb-48 pt-24 subpixel-antialiased transition-colors duration-300 selection:bg-blue-100 dark:bg-zinc-900 dark:selection:bg-zinc-800 lg:pb-56 lg:pt-32">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
