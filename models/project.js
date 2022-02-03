import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
	title: { type: String, required: true },
	excerpt: { type: String, required: true },
	github: { type: String, required: true },
	link: { type: String, required: true },
	date: { type: String, required: true },
	coverImageUrl: { type: String, required: true },
	content: { type: String, required: true },
});

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
