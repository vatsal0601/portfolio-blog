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
			<p className="container mx-auto px-5 md:px-10 lg:text-lg text-zinc-600 dark:text-zinc-400">
				Oops, something went wrong please try again later
			</p>
		);

	const { title, excerpt, coverImageUrl, date, github, link, content } = project;
	return (
		<>
			<Head title={title.slice(2)} description={excerpt} />
			<main className="container mx-auto py-2 px-5 md:px-10 space-y-3">
				<button
					onClick={() => router.back()}
					className="text-blue-600 dark:text-blue-500 lg:text-lg focus:outline-none print:hidden">
					&larr; <span className="hover:underline">Go Back</span>
				</button>

				<article className="space-y-3">
					<section className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-5 lg:pb-10 border-b border-zinc-200 dark:border-zinc-800">
						<div className="space-y-3 self-center">
							<h1 className="text-3xl sm:text-4xl xl:text-5xl text-blue-600 dark:text-blue-500 font-bold tracking-tight">
								{title}
							</h1>
							<p className="prose lg:prose-lg dark:prose-invert">{excerpt}</p>
							<p className="text-sm lg:text-base text-blue-600 dark:text-blue-500 space-x-1 lg:space-x-3">
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
							<p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-light">
								Published on {date}
							</p>
							<p className="hidden print:block text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-light italic">
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
							className={`rounded-md bg-zinc-300 dark:bg-zinc-600 ${isLoading && "animate-pulse"}`}>
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
					<RenderPost content={content} headingRef={headingRef} toc={toc} />
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
