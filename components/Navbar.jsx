import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const pageLinks = [
	{ name: "Home", link: "/" },
	{ name: "About", link: "/about" },
	{ name: "Project", link: "/project" },
	{ name: "Blog", link: "/blog" },
];

const Navbar = () => {
	const router = useRouter();

	const [isScrolled, setIsScrolled] = useState(false);

	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) setIsScrolled(true);
			else setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	useEffect(() => {
		const getDarkMode = () => {
			if (
				localStorage.theme === "dark" ||
				(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				document.documentElement.classList.add("dark");
				localStorage.theme = "dark";
				setIsDarkMode(true);
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.theme = "light";
				setIsDarkMode(false);
			}
		};
		getDarkMode();
	}, [setIsDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode((isDarkMode) => !isDarkMode);
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		} else {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		}
	};

	return (
		<header
			className={`w-full fixed top-0 z-50 bg-white dark:bg-zinc-900 border-b ${
				isScrolled ? "border-zinc-200 dark:border-zinc-800" : "border-transparent"
			} transition-colors duration-300`}>
			<ProgressBar />
			<nav
				className="container mx-auto py-3 px-5 md:px-10 flex items-center justify-between relative"
				role="navigation">
				<Link href="/">
					<a className="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-200 active:text-blue-600 transition-colors">
						VS
					</a>
				</Link>

				<div className="flex items-center divide-x divide-zinc-200 dark:divide-zinc-800">
					<ul className="flex items-center gap-1 lg:gap-5 pr-3 font-semibold">
						{pageLinks.map(({ name, link }, index) => (
							<li key={index}>
								<Link href={link}>
									<a
										className={`${
											router.pathname == link
												? "text-zinc-900 dark:text-zinc-200 font-semibold"
												: "text-zinc-600 dark:text-zinc-400 font-normal"
										} active:text-blue-600 lg:text-lg transition-colors hover:bg-blue-100 dark:hover:bg-zinc-800 py-1 px-1 lg:px-2 rounded-md`}>
										{name}
									</a>
								</Link>
							</li>
						))}
					</ul>
					<div className="pl-3">
						<button
							onClick={toggleDarkMode}
							aria-label="Theme-Switcher"
							name="Theme-Switcher"
							className="w-5 lg:w-7 h-5 lg:h-7 text-zinc-900 dark:text-zinc-200 cursor-pointer focus:outline-none">
							{isDarkMode ? <MoonIcon /> : <SunIcon />}
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
