import { gql } from "graphql-request";

export const GetProject = gql`
	query ($slug: String!) {
		projects(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					link
					github
					cover {
						data {
							attributes {
								url
								formats
							}
						}
					}
					date
					content
				}
			}
		}
	}
`;

export const GetAllSlugs = gql`
	query {
		projects {
			data {
				attributes {
					slug
				}
			}
		}
	}
`;

export const GetAllProjects = gql`
	query {
		projects(sort: "createdAt:desc") {
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
