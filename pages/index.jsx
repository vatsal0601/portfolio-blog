import Head from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import RenderCards from "../components/RenderCards";
import src from "../public/images/image.jpg";
import { fetchData } from "../lib/fetch";
import { GET_ALL_PROJECTS, GET_ALL_BLOGS } from "../graphql/query";

const Home = ({ projects, blogs }) => {
	return (
		<>
			<Head
				title="Vatsal Sakariya"
				description="Vatsal's Portfolio"
				keywords="Vatsal Sakariya, Portfolio, Web Development, Projects, Blogs"
			/>
			<main className="container mx-auto py-2 px-5 md:px-10 space-y-12 lg:space-y-16">
				<section className="grid grid-col-1 md:grid-cols-2 gap-3">
					<div className="w-32 h-32 sm:w-56 sm:h-56 xl:w-96 xl:h-96 p-1 sm:p-2 xl:p-3 border-2 border-blue-600 rounded-full md:place-self-center">
						<Image
							src={src}
							alt="Vatsal Sakariya's image"
							width="100"
							height="100"
							layout="responsive"
							objectFit="cover"
							objectPosition="left center"
							className="rounded-full"
						/>
					</div>
					<div className="space-y-1 lg:space-y-3 lg:self-center">
						<h1 className="text-4xl xl:text-5xl text-zinc-900 dark:text-zinc-200 font-bold tracking-tight">
							Hi, my name is Vatsal.
						</h1>
						<p className="prose lg:prose-lg dark:prose-invert">
							I am a full stack developer. Currently I am a student at Nirma University. This is my
							personal website - where you will find all the stuff I am currently doing and thinking
							about.
						</p>
						<div className="flex items-center gap-3">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://drive.google.com/file/d/1_vRWL3y2DhnKowacPnnvHKD-EUd58f9o/view?usp=sharing"
								className="bg-blue-200 active:bg-blue-300 transition-colors text-blue-700 font-semibold text-sm lg:text-base px-3 py-1 rounded-md">
								Download Resume &darr;
							</a>
							<div>
								<Link href="/about">
									<a className="text-blue-600 dark:text-blue-500 text-sm lg:text-base">
										More about me &rarr;
									</a>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl xl:text-4xl text-zinc-900 dark:text-zinc-200 font-bold tracking-tight">
						⚒️ Projects
					</h2>
					{projects?.error ? (
						<p className="lg:text-lg text-zinc-600 dark:text-zinc-400">
							Oops, something went wrong please try again later
						</p>
					) : (
						<RenderCards type="project" data={projects.projects} />
					)}
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl xl:text-4xl text-zinc-900 dark:text-zinc-200 font-bold tracking-tight">
						📝 Blogs
					</h2>
					{blogs?.error ? (
						<p className="lg:text-lg text-zinc-600 dark:text-zinc-400">
							Oops, something went wrong please try again later
						</p>
					) : (
						<RenderCards type="blog" data={blogs.blogs} />
					)}
				</section>
			</main>
		</>
	);
};

export default Home;

export const getStaticProps = async () => {
	let projects, blogs;
	try {
		projects = await fetchData(GET_ALL_PROJECTS(3));
		blogs = await fetchData(GET_ALL_BLOGS(3));
	} catch (err) {
		projects = { error: err };
		blogs = { error: err };
	}
	return {
		props: {
			projects,
			blogs,
		},
		revalidate: 1,
	};
};
