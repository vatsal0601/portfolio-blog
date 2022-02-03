import Head from "../../components/Header";
import RenderCards from "../../components/RenderCards";
import { connectDatabase } from "../../lib/db";
import { fetchProjects } from "../../lib/fetch";

const AllProjects = ({ projects }) => {
	if (projects?.error)
		return (
			<p className="container mx-auto px-5 md:px-10 lg:text-lg text-zinc-600 dark:text-zinc-400">
				Oops, something went wrong please try again later
			</p>
		);
	return (
		<>
			<Head
				title="Project - Vatsal Sakariya"
				description="Vatsal Sakariya's projects"
				keywords="Portfolio, Web Development, Projects, Projects"
			/>
			<main className="container mx-auto py-2 px-5 md:px-10 space-y-12 lg:space-y-16">
				<h1 className="text-4xl xl:text-5xl text-zinc-900 dark:text-zinc-200 font-bold tracking-tight">
					⚒️ Projects
				</h1>
				<RenderCards data={projects.projects} type="project" />
			</main>
		</>
	);
};

export default AllProjects;

export const getStaticProps = async () => {
	let projects;
	connectDatabase();
	projects = await fetchProjects(10);
	projects = { projects };
	return {
		props: {
			projects,
		},
		revalidate: 1,
	};
};
