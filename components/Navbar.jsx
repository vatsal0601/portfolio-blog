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
				(!("theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
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
			className={`fixed top-0 z-50 w-full border-b bg-white dark:bg-zinc-900 ${
				isScrolled
					? "border-zinc-200 dark:border-zinc-800"
					: "border-transparent"
			} transition-colors duration-300 print:hidden`}>
			<ProgressBar />
			<nav
				className="container relative flex items-center justify-between py-3"
				role="navigation">
				<Link href="/">
					<a className="text-3xl font-black tracking-tight text-zinc-900 transition-colors active:text-blue-600 dark:text-zinc-200 lg:text-4xl">
						VS
					</a>
				</Link>

				<div className="flex items-center divide-x divide-zinc-200 dark:divide-zinc-800">
					<ul className="flex items-center space-x-1 pr-3 font-semibold lg:space-x-5">
						{pageLinks.map(({ name, link }, index) => (
							<li key={index}>
								<Link href={link}>
									<a
										className={`${
											router.pathname == link
												? "font-semibold text-zinc-900 dark:text-zinc-200"
												: "font-normal text-zinc-600 dark:text-zinc-400"
										} rounded-md py-1 px-1 transition-colors hover:bg-blue-100 active:text-blue-600 dark:hover:bg-zinc-800 lg:px-2 lg:text-lg`}>
										{name}
									</a>
								</Link>
							</li>
						))}
					</ul>
					<div className="pl-3">
						<button
							onClick={toggleDarkMode}
							aria-label="theme-switcher"
							name="Theme-Switcher"
							className="h-5 w-5 cursor-pointer text-zinc-900 focus:outline-none dark:text-zinc-200 lg:h-7 lg:w-7">
							{isDarkMode ? <MoonIcon /> : <SunIcon />}
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
