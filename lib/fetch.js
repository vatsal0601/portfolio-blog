import { Blog } from "../models/blog";
import { Project } from "../models/project";

export const fetchBlogs = async (number) => {
	try {
		let blogs = await Blog.find({}, { content: 0, keywords: 0 }).sort({ _id: -1 }).limit(number);
		if (blogs == null) return { error: "cannot find blogs" };
		blogs = blogs.map((blog) => ({
			id: blog._id.toString(),
			title: blog.title,
			excerpt: blog.excerpt,
			date: blog.date,
			time: blog.time,
			coverImageUrl: blog.coverImageUrl,
		}));
		return blogs;
	} catch (err) {
		return { error: err.message };
	}
};

export const fetchBlogIds = async () => {
	try {
		let blogs = await Blog.find({}, { _id: 1 });
		blogs = blogs.map((blog) => blog._id.toString());
		if (blogs == null) return { error: "xannot find blog ids" };
		return blogs;
	} catch (err) {
		return { error: err.message };
	}
};

export const fetchBlog = async (id) => {
	try {
		let blog = await Blog.findById(id);
		if (blog == null) return { error: "cannot find required blog" };
		return {
			id: blog._id.toString(),
			title: blog.title,
			excerpt: blog.excerpt,
			date: blog.date,
			time: blog.time,
			coverImageUrl: blog.coverImageUrl,
			content: blog.content,
			keywords: blog.keywords,
		};
	} catch (err) {
		return { error: err.message };
	}
};

export const fetchProjects = async (number) => {
	try {
		let projects = await Project.find({}, { content: 0 }).sort({ _id: -1 }).limit(number);
		if (projects == null) return { error: "cannot find projects" };
		projects = projects.map((project) => ({
			id: project._id.toString(),
			title: project.title,
			excerpt: project.excerpt,
			date: project.date,
			github: project.github,
			link: project.link,
			coverImageUrl: project.coverImageUrl,
		}));
		return projects;
	} catch (err) {
		return { error: err.message };
	}
};

export const fetchProjectIds = async () => {
	try {
		let projects = await Project.find({}, { _id: 1 });
		projects = projects.map((project) => project._id.toString());
		if (projects == null) return { error: "cannot find project ids" };
		return projects;
	} catch (err) {
		return { error: err.message };
	}
};

export const fetchProject = async (id) => {
	try {
		let project = await Project.findById(id);
		if (project == null) return { error: "Cannot find required project" };
		return {
			id: project._id.toString(),
			title: project.title,
			excerpt: project.excerpt,
			date: project.date,
			github: project.github,
			link: project.link,
			coverImageUrl: project.coverImageUrl,
			content: project.content,
		};
	} catch (err) {
		return { error: err.message };
	}
};
