import Head from "../../components/Header";
import Image from "next/image";
import RenderPost from "../../components/RenderPost";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { connectDatabase } from "../../lib/db";
import { fetchProject, fetchProjectIds } from "../../lib/fetch";
import { useTOC } from "../../lib/useTOC";

const Project = ({ project }) => {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const headingRef = useRef(null);
	const [toc] = useTOC(headingRef);

	if (project?.error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
				Oops, something went wrong please try again later
			</p>
		);

	const { title, excerpt, coverImageUrl, date, github, link, content } =
		project;
	return (
		<>
			<Head title={title.slice(2)} description={excerpt} />
			<main className="container space-y-3">
				<button
					onClick={() => router.back()}
					className="text-blue-600 focus:outline-none dark:text-blue-500 print:hidden lg:text-lg">
					&larr; <span className="hover:underline">Go Back</span>
				</button>

				<article className="space-y-3">
					<section className="grid grid-cols-1 gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800 lg:grid-cols-2 lg:pb-10">
						<div className="space-y-3 self-center">
							<h1 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-500 sm:text-4xl xl:text-5xl">
								{title}
							</h1>
							<p className="prose dark:prose-invert lg:prose-lg">
								{excerpt}
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
								Published on {date}
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
								src={coverImageUrl}
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
	let projectIds = [];
	connectDatabase();
	projectIds = await fetchProjectIds();
	projectIds = projectIds.map((id) => ({
		params: {
			id,
		},
	}));

	return {
		paths: projectIds,
		fallback: true,
	};
};

export const getStaticProps = async (context) => {
	let project;
	connectDatabase();
	const { id } = context.params;
	project = await fetchProject(id);

	return {
		props: {
			project: project,
		},
		revalidate: 1,
	};
};
