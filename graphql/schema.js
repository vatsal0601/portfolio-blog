import { gql } from "apollo-server-micro";

export const type = gql`
	type Blog {
		id: String!
		title: String!
		excerpt: String!
		date: String!
		time: String!
		coverImageUrl: String!
		content: String!
		keywords: String!
	}

	type Project {
		id: String!
		title: String!
		excerpt: String!
		github: String!
		link: String!
		date: String!
		coverImageUrl: String!
		content: String!
	}

	type Query {
		blog(id: String!): Blog!
		project(id: String!): Project!
		blogs(number: Int!): [Blog!]!
		projects(number: Int!): [Project!]!
		getAllBlogsId: [String!]!
		getAllProjectsId: [String!]!
	}
`;
