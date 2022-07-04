import Head from "@components/Header";

const AllProjects = ({ projects }) => {
	if (projects?.error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
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
			<main className="container space-y-12 lg:space-y-16">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-5xl">
					⚒️ Projects
				</h1>
			</main>
		</>
	);
};

export default AllProjects;
