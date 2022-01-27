import Markdown from "./Markdown";

const RenderPost = ({ content, toc, headingRef }) => {
	return (
		<div className="xl:flex gap-28">
			<aside className="hidden xl:block bg-blue-100 dark:bg-zinc-800 sticky top-28 w-96 h-full p-8 rounded-md">
				<p className="text-sm text-blue-700 dark:text-blue-500 font-semibold">On this page</p>
				<div className="prose prose-zinc hover:prose-a:text-blue-600 dark:hover:prose-a:text-blue-500 prose-a:no-underline prose-a:font-normal first:prose-ul:pl-0 prose-ul:list-outside prose-ul:list-none prose-li:pl-0 dark:prose-invert">
					<Markdown content={toc} />
				</div>
			</aside>
			<section
				ref={headingRef}
				className="prose lg:prose-lg prose-zinc prose-blue prose-img:rounded-md prose-pre:rounded-md prose-headings:scroll-m-20 lg:prose-headings:scroll-m-24 dark:prose-invert">
				<Markdown content={content} />
			</section>
		</div>
	);
};

export default RenderPost;
