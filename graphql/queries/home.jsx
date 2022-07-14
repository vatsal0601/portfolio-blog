import { gql } from "graphql-request";

export const GetRecentBlogsProjects = gql`
	query {
		blogs(sort: "createdAt:desc", pagination: { limit: 3 }) {
			data {
				attributes {
					title
					excerpt
					cover {
						data {
							attributes {
								url
								formats
							}
						}
					}
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
		projects(sort: "date:desc", pagination: { limit: 3 }) {
			data {
				attributes {
					title
					description
					cover {
						data {
							attributes {
								url
								formats
							}
						}
					}
					slug
					link
					github
					date
				}
			}
		}
	}
`;
