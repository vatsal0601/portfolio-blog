import Head from "@components/Header";
import RenderCards from "@components/RenderCards";
import { client } from "@lib/gqlClient";
import useSWR, { unstable_serialize } from "swr";
import { GetAllCollections } from "@graphql/queries/blog";

const AllBlogs = () => {
	const {
		data: {
			collections: { data: collections },
		},
		error,
	} = useSWR({ query: GetAllCollections, id: "GetAllCollections" });

	if (error)
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
				<div className="space-y-5 lg:space-y-10">
					{collections.map(
						(
							{
								attributes: {
									name,
									blogs: { data: blogs },
								},
							},
							index
						) => (
							<div key={index} className="space-y-3 lg:space-y-5">
								<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-4xl">
									{name}
								</h1>
								<RenderCards
									data={blogs}
									type="blog"
									name={name}
								/>
							</div>
						)
					)}
				</div>
			</main>
		</>
	);
};

export default AllBlogs;

export const getStaticProps = async () => {
	const data = await client.request(GetAllCollections);

	return {
		props: {
			fallback: {
				[unstable_serialize({
					query: GetAllCollections,
					id: "GetAllCollections",
				})]: data,
			},
		},
		revalidate: 60,
	};
};
