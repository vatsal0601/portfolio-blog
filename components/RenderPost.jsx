import Markdown from "./Markdown";

const RenderPost = ({ content, toc, headingRef }) => {
	return (
		<div className="gap-28 xl:flex">
			<aside className="sticky top-28 hidden h-full w-96 rounded-md bg-blue-100 p-8 dark:bg-zinc-800 xl:block">
				<p className="text-sm font-semibold text-blue-700 dark:text-blue-500">
					On this page
				</p>
				<div className="prose prose-zinc prose-a:font-normal prose-a:no-underline hover:prose-a:text-blue-600 prose-ul:list-outside prose-ul:list-none first:prose-ul:pl-0 prose-li:pl-0 dark:prose-invert dark:hover:prose-a:text-blue-500">
					<Markdown content={toc} />
				</div>
			</aside>
			<section
				ref={headingRef}
				className="prose prose-zinc prose-headings:scroll-m-20 prose-a:font-semibold prose-a:decoration-blue-600 prose-a:underline-offset-4 hover:prose-a:decoration-2 prose-img:rounded-md dark:prose-invert dark:prose-a:decoration-blue-500 lg:prose-lg lg:prose-headings:scroll-m-24">
				<Markdown content={content} />
			</section>
		</div>
	);
};

export default RenderPost;
