import Head from "../../components/Header";
import RenderCards from "../../components/RenderCards";
import { connectDatabase } from "../../lib/db";
import { fetchBlogs } from "../../lib/fetch";

const AllBlogs = ({ blogs }) => {
	if (blogs?.error)
		return (
			<p className="container text-zinc-600 dark:text-zinc-400 lg:text-lg">
				Oops, something went wrong please try again later
			</p>
		);

	return (
		<>
			<Head
				title="Blog - Vatsal Sakariya"
				description="Vatsal Sakariya's blogs"
				keywords="Portfolio, Web Development, Projects, Blogs"
			/>
			<main className="container space-y-12 lg:space-y-16">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-5xl">
					📝 Blogs
				</h1>
				<RenderCards data={blogs.blogs} type="blog" />
			</main>
		</>
	);
};

export default AllBlogs;

export const getStaticProps = async () => {
	let blogs;
	connectDatabase();
	blogs = await fetchBlogs(10);
	blogs = { blogs };

	return {
		props: {
			blogs,
		},
		revalidate: 1,
	};
};
