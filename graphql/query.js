export const GET_ALL_PROJECTS = (number) => `{
	projects(number: ${number}) {
		id
		title
		excerpt
		github
		link
		date
		coverImageUrl
	}
}`;

export const GET_PROJECT = (id) => `{
	project(id: "${id}") {
		title
		excerpt
		github
		link
		date
		coverImageUrl
		content
	}
}`;

export const GET_ALL_BLOGS = (number) => `{
	blogs(number: ${number}) {
		id
		title
		excerpt
		time
		date
		coverImageUrl
	}
}`;

export const GET_BLOG = (id) => `{
	blog(id: "${id}") {
		title
		excerpt
		time
		date
		coverImageUrl
		content
		keywords
	}
}`;

export const GET_ALL_BLOGS_ID = `{
	getAllBlogsId
}`;

export const GET_ALL_PROJECTS_ID = `{
	getAllProjectsId
}`;
