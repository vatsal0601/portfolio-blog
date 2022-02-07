import Head from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import RenderCards from "../components/RenderCards";
import src from "../public/images/image.jpg";
import { connectDatabase } from "../lib/db";
import { fetchProjects, fetchBlogs } from "../lib/fetch";

const Home = ({ projects, blogs }) => {
	return (
		<>
			<Head
				title="Vatsal Sakariya"
				description="Vatsal's Portfolio"
				keywords="Vatsal Sakariya, Portfolio, Web Development, Projects, Blogs"
			/>
			<main className="container mx-auto space-y-12 py-2 px-5 md:px-10 lg:space-y-16">
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
							Hi, my name is Vatsal.
						</h1>
						<p className="prose lg:prose-lg dark:prose-invert">
							I am a full stack developer. Currently I am a student at Nirma
							University. This is my personal website - where you will find all the
							stuff I am currently doing and thinking about.
						</p>
						<div className="flex items-center gap-3">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://drive.google.com/file/d/1_vRWL3y2DhnKowacPnnvHKD-EUd58f9o/view?usp=sharing"
								className="rounded-md bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-base">
								Download Resume &darr;
							</a>
							<div>
								<Link href="/about">
									<a className="text-sm text-blue-600 dark:text-blue-500 lg:text-base">
										More about me &rarr;
									</a>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
						⚒️ Projects
					</h2>
					{projects?.error ? (
						<p className="text-zinc-600 dark:text-zinc-400 lg:text-lg">
							Oops, something went wrong please try again later
						</p>
					) : (
						<RenderCards type="project" data={projects.projects} />
					)}
				</section>
				<section className="space-y-3">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
						📝 Blogs
					</h2>
					{blogs?.error ? (
						<p className="text-zinc-600 dark:text-zinc-400 lg:text-lg">
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
	connectDatabase();
	projects = await fetchProjects(3);
	projects = { projects };
	blogs = await fetchBlogs(3);
	blogs = { blogs };

	return {
		props: {
			projects,
			blogs,
		},
		revalidate: 1,
	};
};
