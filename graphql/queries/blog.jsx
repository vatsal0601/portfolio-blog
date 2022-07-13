import { gql } from "graphql-request";

export const GetBlog = gql`
	query ($slug: String!) {
		blogs(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					excerpt
					readTime
					slug
					cover
					keywords
					createdAt
					updatedAt
					content
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
	}
`;

export const GetAllSlugs = gql`
	query {
		blogs {
			data {
				attributes {
					slug
				}
			}
		}
	}
`;

export const GetAllCollections = gql`
	query {
		collections {
			data {
				attributes {
					name
					blogs {
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
				}
			}
		}
	}
`;
