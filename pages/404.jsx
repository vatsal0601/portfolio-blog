import Link from "next/link";
import Head from "@components/Header";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";

const Error404 = () => {
	return (
		<>
			<Head title="404 - Page not found" />
			<main className="container grid place-content-center">
				<div className="space-y-3 lg:space-y-5">
					<h1 className="text-8xl font-bold tracking-tight text-blue-600 dark:text-blue-500 xl:text-9xl">
						404
					</h1>
					<div className="space-y-1 lg:space-y-3">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
							Oops, you still haven't found what you looking for?
						</h2>
						<p className="prose prose-zinc lg:prose-lg">
							The page you are looking for might have been
							removed, had its name changed, or is temporarily
							unavailable.
						</p>
					</div>
					<Link href="/">
						<a className="inline-flex items-center space-x-1 rounded-md bg-blue-200 px-3 py-1 font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-lg">
							<ArrowNarrowLeftIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							<span>Back to home</span>
						</a>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Error404;
