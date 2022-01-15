import { connectDatabase } from "../../lib/db";
import { Blog } from "../../models/blog";

const handler = async (req, res) => {
	connectDatabase();

	let id = "61d5118805c061b0e66894a4";
	try {
		let blog = await Blog.findById(id);
		if (blog == null) res.json({ error: "cannot find required blog" });
		res.json({
			id: blog._id.toString(),
			title: blog.title,
			excerpt: blog.excerpt,
			date: blog.date,
			time: blog.time,
			coverImageUrl: blog.coverImageUrl,
			content: blog.content,
			keywords: blog.keywords,
		});
	} catch (err) {
		res.json({ error: err.message });
	}
};

export default handler;
