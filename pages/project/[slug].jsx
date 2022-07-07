import Head from "@components/Header";
import Image from "next/image";
import RenderPost from "@components/RenderPost";
import getConfig from "next/config";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTOC } from "@lib/useTOC";
import { initializeApollo } from "@lib/apolloClient";
import { useQuery } from "@apollo/client";
import { GetProject, GetAllSlugs } from "@graphql/queries/project";
import { renderDate } from "@lib/renderDate";

const Project = ({ slug }) => {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const headingRef = useRef(null);
	const [toc] = useTOC(headingRef);
	const {
		data: {
			projects: { data },
		},
		error,
	} = useQuery(GetProject, { variables: { slug } });

	if (error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
				Oops, something went wrong please try again later
			</p>
		);

	const { title, description, cover, date, github, link, content } =
		data[0].attributes;
	return (
		<>
			<Head title={title.slice(2)} description={description} />
			<main className="container space-y-3">
				<button
					aria-label="go-back"
					onClick={() => router.back()}
					className="inline-flex items-center space-x-1 text-blue-600 focus:outline-none dark:text-blue-500 print:hidden lg:text-lg">
					<ArrowNarrowLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					<span className="hover:underline">Go Back</span>
				</button>

				<article className="space-y-3">
					<section className="grid grid-cols-1 gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800 lg:grid-cols-2 lg:pb-10">
						<div className="space-y-3 self-center">
							<h1 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500 sm:text-4xl xl:text-5xl">
								{title}
							</h1>
							<p className="prose dark:prose-invert lg:prose-lg">
								{description}
							</p>
							<p className="space-x-1 text-sm text-blue-600 dark:text-blue-500 lg:space-x-3 lg:text-base">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={github}
									className="hover:underline">
									GitHub
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={link}
									className="hover:underline">
									Link
								</a>
							</p>
							<p className="text-sm font-light text-zinc-600 dark:text-zinc-400 lg:text-base">
								Published on {renderDate(date)}
							</p>
							<p className="hidden text-sm font-light italic text-zinc-600 dark:text-zinc-400 print:block lg:text-base">
								By{" "}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.linkedin.com/in/vatsal-sakariya-1867a5191">
									Vatsal Sakariya
								</a>
							</p>
						</div>
						<div
							className={`rounded-md bg-zinc-300 dark:bg-zinc-600 ${
								isLoading && "animate-pulse"
							}`}>
							<Image
								src={cover}
								alt={title}
								width="16"
								height="9"
								layout="responsive"
								objectFit="cover"
								objectPosition="center center"
								className="rounded-md"
								onLoad={() => setIsLoading(false)}
							/>
						</div>
					</section>
					<RenderPost
						content={content}
						headingRef={headingRef}
						toc={toc}
					/>
				</article>
			</main>
		</>
	);
};

export default Project;

export const getStaticPaths = async () => {
	const { serverRuntimeConfig } = getConfig();
	try {
		const res = await fetch(`${serverRuntimeConfig.BACKEND_URL}/graphql`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: GetAllSlugs }),
		});
		const slugsData = await res.json();
		const {
			data: {
				projects: { data },
			},
		} = slugsData;
		const slugs = data.map(({ attributes: { slug } }) => ({
			params: { slug },
		}));

		return {
			paths: slugs,
			fallback: true,
		};
	} catch (err) {
		console.error(err);
		return {
			paths: [],
			fallback: true,
		};
	}
};

export const getStaticProps = async ({ params: { slug } }) => {
	if (!slug) {
		throw new Error("Invalid slug");
	}

	try {
		const apolloClient = initializeApollo();
		await apolloClient.query({ query: GetProject, variables: { slug } });

		return {
			props: {
				slug,
				initialApolloState: apolloClient.cache.extract(),
			},
			revalidate: 60,
		};
	} catch (err) {
		console.error(err);
		return {
			notFound: true,
		};
	}
};
