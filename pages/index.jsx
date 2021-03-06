import src from "../public/images/image.jpg";
import Head from "@components/Header";
import Image from "next/image";
import Link from "next/link";
import RenderCards from "@components/RenderCards";
import { ArrowNarrowRightIcon, DownloadIcon } from "@heroicons/react/solid";
import { client } from "@lib/gqlClient";
import useSWR, { unstable_serialize } from "swr";
import { GetRecentBlogsProjects } from "@graphql/queries/home";

const Home = () => {
	const {
		data: {
			blogs: { data: blogs },
			projects: { data: projects },
		},
		error,
	} = useSWR({ query: GetRecentBlogsProjects, id: "GetRecentBlogsProjects" });

	if (error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
				Oops, something went wrong please try again later
			</p>
		);

	return (
		<>
			<Head
				title="Vatsal Sakariya"
				description="Vatsal Sakariya's Portfolio"
				keywords="Vatsal Sakariya, Portfolio, Web Development, Projects, Blogs"
			/>
			<main className="container space-y-12 lg:space-y-16">
				<section className="grid-col-1 grid gap-3 md:grid-cols-2">
					<div className="h-32 w-32 rounded-full border-2 border-blue-600 p-1 sm:h-56 sm:w-56 sm:p-2 md:place-self-center xl:h-96 xl:w-96 xl:p-3">
						<Image
							src={src}
							alt="Vatsal Sakariya's image"
							width="100"
							height="100"
							layout="responsive"
							objectFit="cover"
							objectPosition="left center"
							priority="true"
							className="rounded-full"
						/>
					</div>
					<div className="space-y-1 lg:space-y-3 lg:self-center">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-5xl">
							Hi 👋🏻, I&apos;m Vatsal.
						</h1>
						<p className="prose prose-zinc dark:prose-invert lg:prose-lg">
							A front-end developer, currently studying at Nirma
							University. This is my personal website, where you
							will find all the stuff I am currently doing and
							thinking about.
						</p>
						<div className="flex items-center space-x-3">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="/resume.pdf"
								className="inline-flex items-center space-x-1 rounded-md bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-base">
								<DownloadIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								<span>Download Resume</span>
							</a>
							<Link href="/about">
								<a className="inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-500 lg:text-base">
									<span>More about me</span>
									<ArrowNarrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								</a>
							</Link>
						</div>
					</div>
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
						⚒️ Recent Projects
					</h2>
					<RenderCards type="project" data={projects} />
					<Link href="/project">
						<a className="inline-flex items-center space-x-1 rounded-md bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-base">
							<span>Show all projects</span>
							<ArrowNarrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						</a>
					</Link>
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
						📝 Recent Blogs
					</h2>
					<RenderCards type="blog" data={blogs} />
					<Link href="/blog">
						<a className="inline-flex items-center space-x-1 rounded-md bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-base">
							<span>Show all blogs</span>
							<ArrowNarrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						</a>
					</Link>
				</section>
			</main>
		</>
	);
};

export default Home;

export const getStaticProps = async () => {
	const data = await client.request(GetRecentBlogsProjects);

	return {
		props: {
			fallback: {
				[unstable_serialize({
					query: GetRecentBlogsProjects,
					id: "GetRecentBlogsProjects",
				})]: data,
			},
		},
		revalidate: 60,
	};
};
