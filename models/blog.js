import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
	title: { type: String, required: true },
	excerpt: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	coverImageUrl: { type: String, required: true },
	content: { type: String, required: true },
	keywords: { type: String, required: true },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
