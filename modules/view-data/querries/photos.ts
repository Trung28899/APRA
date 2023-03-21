import { gql } from "graphql-tag";

export const PHOTOS_QUERY = gql`
  query {
    photos(options: { paginate: { limit: 15 } }) {
      data {
        id
        title
        thumbnailUrl
      }
    }
  }
`;

export const FIND_PHOTO = gql`
  query FindPhoto($searchTerm: String!, $limit: Int!) {
    photos(
      options: { search: { q: $searchTerm }, paginate: { limit: $limit } }
    ) {
      data {
        id
        title
        thumbnailUrl
      }
      meta {
        totalCount
      }
    }
  }
`;
