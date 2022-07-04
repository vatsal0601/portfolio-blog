import { gql } from "@apollo/client";

export const GetRecentBlogsProjects = gql`
	query {
		blogs(sort: "createdAt:desc", pagination: { limit: 3 }) {
			data {
				attributes {
					title
					excerpt
					cover
					slug
					readTime
					createdAt
				}
			}
		}
		projects(sort: "createdAt:desc", pagination: { limit: 3 }) {
			data {
				attributes {
					title
					description
					cover
					slug
					link
					github
					date
				}
			}
		}
	}
`;
