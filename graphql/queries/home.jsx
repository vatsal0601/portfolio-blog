import { gql } from "graphql-request";

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
					collection {
						data {
							attributes {
								name
							}
						}
					}
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
