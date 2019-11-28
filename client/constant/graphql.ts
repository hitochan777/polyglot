import gql from "graphql-tag";

export const TWEET_FIELD_FRAGMENT = gql`
  fragment tweetField on Tweet {
    id
    text
  }
`;

export const LINE_FIELD_FRAGMENT = gql`
  fragment lineField on Line {
    id
    partialLines {
      text
    }
    replies {
      ...tweetField
    }
  }
  ${TWEET_FIELD_FRAGMENT}
`;

export const POST_FIELD_FRAGMENT = gql`
  fragment postField on Post {
    id
    title
    json
    lines {
      id
      partialLines {
        text
      }
      replies {
        ...tweetField
      }
    }
    language {
      id
      name
    }
    user {
      username
    }
    isDraft
  }
  ${TWEET_FIELD_FRAGMENT}
`;

export const FETCH_VIEWER_QUERY = gql`
  query fetchViewer {
    viewer {
      id
      username
      email
      fluentLanguages
      learningLanguages
      posts {
        ...postField
      }
    }
  }
  ${POST_FIELD_FRAGMENT}
`;

export const FETCH_POST_BY_ID_QUERY = gql`
  query fetchPostById($id: Int!) {
    post(id: $id) {
      ...postField
    }
  }
  ${POST_FIELD_FRAGMENT}
`;

export const FETCH_FEED_FOR_USER_QUERY = gql`
  query fetchFeedForUser($uid: String!) {
    feed(uid: $uid) {
      ...postField
    }
  }
  ${POST_FIELD_FRAGMENT}
`;

export const FETCH_LANGUAGES_QUERY = gql`
  query fetchLanguages {
    langs {
      id
      name
    }
  }
`;

export const POST_UPDATE_MUTATION = gql`
  mutation postUpdate($id: Int!, $post: PostInput!) {
    postUpdate(id: $id, post: $post) {
      id
    }
  }
`;

export const POST_CREATE_MUTATION = gql`
  mutation postCreate($post: PostInput!) {
    postCreate(post: $post) {
      id
    }
  }
`;

export const USER_UPDATE_MUTATION = gql`
  mutation userUpdate($id: String!, $user: UserInput!) {
    userUpdate(id: $id, user: $user) {
      id
      email
      username
      fluentLanguages
      learningLanguages
    }
  }
`;

export const TWEET_CREATE_MUTATION = gql`
  mutation tweetCreate($tweet: TweetInput!) {
    tweetCreate(tweet: $tweet) {
      id
    }
  }
`;
