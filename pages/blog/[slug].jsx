import Head from "@components/Header";
import Image from "next/image";
import RenderPost from "@components/RenderPost";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTOC } from "@lib/useTOC";
import { renderDate } from "@lib/renderDate";
import { client } from "@lib/gqlClient";
import useSWR, { unstable_serialize } from "swr";
import { GetBlog, GetAllSlugs } from "@graphql/queries/blog";

const Blog = ({ slug }) => {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const headingRef = useRef(null);
	const [toc] = useTOC(headingRef);
	const {
		data: {
			blogs: { data },
		},
		error,
	} = useSWR({ query: GetBlog, variables: { slug }, id: "GetBlog" });

	if (error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
				Oops, something went wrong please try again later
			</p>
		);

	const {
		title,
		excerpt,
		cover,
		createdAt,
		readTime,
		keywords,
		content,
		collection: { data: collection },
	} = data[0].attributes;
	return (
		<>
			<Head
				title={title.slice(2)}
				description={excerpt}
				keywords={keywords}
				image={cover}
			/>
			<main className="container space-y-3">
				<button
					aria-label="go-back"
					onClick={() => router.back()}
					className="inline-flex items-center space-x-1 text-blue-600 focus:outline-none dark:text-blue-500 print:hidden lg:text-lg">
					<ArrowNarrowLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					<span className="hover:underline">Go Back</span>
				</button>

				<article className="space-y-10 lg:space-y-16">
					<section className="grid grid-cols-1 gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800 lg:grid-cols-2 lg:pb-10">
						<div className="space-y-3 self-center">
							<h1 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500 sm:text-4xl xl:text-5xl">
								{title}
							</h1>
							<p className="prose dark:prose-invert lg:prose-lg">
								{excerpt}
							</p>
							<p className="text-sm font-light text-zinc-600 dark:text-zinc-400 lg:text-base">
								Published on {renderDate(createdAt)} &bull;{" "}
								{readTime} minute read
							</p>
							{collection && (
								<p>
									<span className="rounded-md bg-blue-100 px-1 py-0.5 font-semibold text-blue-600 lg:px-2 lg:py-1 lg:text-lg">
										{collection.attributes.name}
									</span>
								</p>
							)}
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

export default Blog;

export const getStaticPaths = async () => {
	try {
		const {
			blogs: { data },
		} = await client.request(GetAllSlugs);
		const slugs = data.map(({ attributes: { slug } }) => ({
			params: { slug },
		}));

		return {
			paths: slugs,
			fallback: "blocking",
		};
	} catch (err) {
		console.error(err);
		return {
			paths: [],
			fallback: "blocking",
		};
	}
};

export const getStaticProps = async ({ params: { slug } }) => {
	if (!slug) {
		throw new Error("Invalid slug");
	}

	try {
		const data = await client.request(GetBlog, { slug });

		return {
			props: {
				slug,
				fallback: {
					[unstable_serialize({
						query: GetBlog,
						variables: { slug },
						id: "GetBlog",
					})]: data,
				},
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
