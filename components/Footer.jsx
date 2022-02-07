import Link from "next/link";

const pageLinks = [
	{ name: "Home", link: "/" },
	{ name: "About", link: "/about" },
	{ name: "Project", link: "/project" },
	{ name: "Blog", link: "/blog" },
];

const socialLinks = [
	{ name: "GitHub", link: "https://github.com/vatsal0601" },
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/vatsal-sakariya-1867a5191",
	},
	{ name: "Twitter", link: "https://twitter.com/vatsal0601" },
	{ name: "Instagram", link: "https://www.instagram.com/vatsal_sakariya" },
];

const Footer = () => {
	return (
		<footer className="absolute bottom-0 z-0 w-full space-y-3 border-t border-zinc-200 bg-white py-3 text-center dark:border-zinc-800 dark:bg-zinc-900 print:hidden">
			<div className="flex justify-evenly">
				<div className="flex flex-col gap-3">
					{pageLinks.map(({ name, link }, index) => (
						<Link href={link} key={index}>
							<a className="text-sm text-zinc-600 transition-colors active:text-blue-600 dark:text-zinc-400 lg:text-base">
								{name}
							</a>
						</Link>
					))}
				</div>
				<div className="flex flex-col gap-3">
					{socialLinks.map(({ name, link }, index) => (
						<a
							key={index}
							target="_blank"
							rel="noopener noreferrer"
							href={link}
							className="text-sm text-zinc-600 transition-colors active:text-blue-600 dark:text-zinc-400 lg:text-base">
							{name}
						</a>
					))}
				</div>
			</div>
			<p className="text-sm font-light text-zinc-600 dark:text-zinc-400 lg:text-base">
				&#169; Vatsal Sakariya
			</p>
		</footer>
	);
};

export default Footer;
