import { gql } from "@apollo/client";

export const GetProject = gql`
	query ($slug: String!) {
		projects(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					link
					github
					cover
					date
					content
				}
			}
		}
	}
`;

export const GetAllSlugs = /* GraphQL */ `
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
