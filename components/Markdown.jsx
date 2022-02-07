import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

const Markdown = ({ content }) => (
	<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypePrism]}>
		{content}
	</ReactMarkdown>
);

export default Markdown;
