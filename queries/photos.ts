import { gql } from "graphql-tag";

export const POSTS_QUERY = gql`
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
