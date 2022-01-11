import { Blog } from "../models/blog";
import { Project } from "../models/project";

export const resolver = {
	Query: {
		blog: async (parent, { id }) => {
			try {
				let blog = await Blog.findById(id);
				blog.id = blog._id;
				delete blog._id;
				if (blog == null) return { title: "Cannot find required blog" };
				return blog;
			} catch (err) {
				return { title: err.message };
			}
		},
		project: async (parent, { id }) => {
			try {
				let project = await Project.findById(id);
				project.id = project._id;
				delete project._id;
				if (project == null) return { title: "Cannot find required project" };
				return project;
			} catch (err) {
				return { title: err.message };
			}
		},
		blogs: async (parent, { number }) => {
			try {
				let blogs = await Blog.find().sort({ _id: -1 }).limit(number);
				blogs = blogs.map((blog) => ({
					id: blog._id,
					title: blog.title,
					excerpt: blog.excerpt,
					date: blog.date,
					time: blog.time,
					coverImageUrl: blog.coverImageUrl,
					content: blog.content,
					keywords: blog.keywords,
				}));
				if (blogs == null) return { title: "Cannot find required blog" };
				return blogs;
			} catch (err) {
				return { title: err.message };
			}
		},
		projects: async (parent, { number }) => {
			try {
				let projects = await Project.find().sort({ _id: -1 }).limit(number);
				projects = projects.map((project) => ({
					id: project._id,
					title: project.title,
					excerpt: project.excerpt,
					date: project.date,
					github: project.github,
					link: project.link,
					coverImageUrl: project.coverImageUrl,
					content: project.content,
				}));
				if (projects == null) return { title: "Cannot find required project" };
				return projects;
			} catch (err) {
				return { title: err.message };
			}
		},
		getAllBlogsId: async () => {
			try {
				let blogs = await Blog.find({}, { _id: 1 });
				blogs = blogs.map((blog) => blog._id);
				if (blogs == null) return { title: "Cannot find blog ids" };
				return blogs;
			} catch (err) {
				return { message: err.message };
			}
		},
		getAllProjectsId: async () => {
			try {
				let projects = await Project.find({}, { _id: 1 });
				projects = projects.map((project) => project._id);
				if (projects == null) return { title: "Cannot find project ids" };
				return projects;
			} catch (err) {
				return { message: err.message };
			}
		},
	},
};
