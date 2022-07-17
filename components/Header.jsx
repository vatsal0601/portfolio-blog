import Head from "next/head";

const Header = ({ title, description, keywords, image }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content="Vatsal Sakariya" />
			<meta charSet="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<link rel="icon" href="/favicon.ico" />
			<meta property="og:site_name" content="Vatsal Sakariya" />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="article" />
			<meta property="article:author" content="Vatsal Sakariya" />
			<meta property="profile:first_name" content="Vatsal" />
			<meta property="profile:last_name" content="Sakariya" />
			<meta property="article:section" content="Technology" />
			<meta property="article:tag" content={keywords} />
			<meta property="og:image" content={image} />
			<meta property="og:image:secure_url" content={image} />
			<meta property="og:image:alt" content={title} />
			<meta property="og:description" content={description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:site" content="@vatsal0601" />
			<meta name="twitter:creator" content="@vatsal0601" />
			<meta
				property="og:url"
				content="https://vatsalsakariya.vercel.app/"
			/>
		</Head>
	);
};

Header.defaultProps = {
	title: "Vatsal Sakariya",
	description: "Vatsal Sakariya's Portfolio",
	keywords: "Vatsal Sakariya, Web Development, Portfolio, Projects, Blogs",
	image: "https://vatsalsakariya.vercel.app/images/image.jpg",
};

export default Header;
