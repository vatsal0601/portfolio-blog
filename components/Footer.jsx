import Link from "next/link";

const pageLinks = [
	{ name: "Home", link: "/" },
	{ name: "About", link: "/about" },
	{ name: "Project", link: "/project" },
	{ name: "Blog", link: "/blog" },
];

const socialLinks = [
	{ name: "GitHub", link: "https://github.com/vatsal0601" },
	{ name: "LinkedIn", link: "https://www.linkedin.com/in/vatsal-sakariya-1867a5191" },
	{ name: "Twitter", link: "https://twitter.com/vatsal0601" },
	{ name: "Instagram", link: "https://www.instagram.com/vatsal_sakariya" },
];

const Footer = () => {
	return (
		<footer className="bg-white dark:bg-zinc-900 w-full absolute z-0 bottom-0 py-3 space-y-3 text-center border-t border-zinc-200 dark:border-zinc-800 print:hidden">
			<div className="flex justify-evenly">
				<div className="flex flex-col gap-3">
					{pageLinks.map(({ name, link }, index) => (
						<Link href={link} key={index}>
							<a className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 active:text-blue-600 transition-colors">
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
							className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 active:text-blue-600 transition-colors">
							{name}
						</a>
					))}
				</div>
			</div>
			<p className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base font-light">
				&#169; Vatsal Sakariya
			</p>
		</footer>
	);
};

export default Footer;
