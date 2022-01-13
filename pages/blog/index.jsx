import Head from "../../components/Header";
import RenderCards from "../../components/RenderCards";
import { connectDatabase } from "../../lib/db";
import { fetchBlogs } from "../../lib/fetch";

const AllBlogs = ({ blogs }) => {
	if (blogs?.error)
		return (
			<p className="container mx-auto px-5 md:px-10 lg:text-lg text-zinc-600 dark:text-zinc-400">
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
			<main className="container mx-auto py-2 px-5 md:px-10 space-y-12 lg:space-y-16">
				<h1 className="text-4xl xl:text-5xl text-zinc-900 dark:text-zinc-200 font-bold tracking-tight">
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
