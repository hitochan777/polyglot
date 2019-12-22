import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthData = {
  __typename?: "AuthData";
  token: Scalars["String"];
};

export type Language = Node & {
  __typename?: "Language";
  /** Unique identifier for the resource */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Line = Node & {
  __typename?: "Line";
  /** Unique identifier for the resource */
  id: Scalars["ID"];
  partialLines: Array<PartialLine>;
  replies: Array<Tweet>;
};

export type LineInput = {
  id?: Maybe<Scalars["ID"]>;
  partialLines: Array<PartialLineInput>;
};

export type Mutation = {
  __typename?: "Mutation";
  userCreate: User;
  userUpdate: User;
  postCreate: Post;
  postUpdate: Post;
  postLike: Post;
  tweetCreate: Tweet;
  tweetLike: Tweet;
  logout: Scalars["Boolean"];
  signin: AuthData;
};

export type MutationUserCreateArgs = {
  id: Scalars["ID"];
};

export type MutationUserUpdateArgs = {
  user: UserInput;
};

export type MutationPostCreateArgs = {
  post: PostInput;
};

export type MutationPostUpdateArgs = {
  id: Scalars["ID"];
  post: PostInput;
};

export type MutationPostLikeArgs = {
  id: Scalars["ID"];
};

export type MutationTweetCreateArgs = {
  tweet: TweetInput;
};

export type MutationTweetLikeArgs = {
  id: Scalars["ID"];
};

export type MutationSigninArgs = {
  token: Scalars["String"];
};

export type Node = {
  /** Unique identifier for the resource */
  id: Scalars["ID"];
};

export type PartialLine = {
  __typename?: "PartialLine";
  text: Scalars["String"];
};

export type PartialLineInput = {
  subtext: Scalars["String"];
  referes?: Maybe<Array<Scalars["String"]>>;
};

export type Post = Node & {
  __typename?: "Post";
  /** Unique identifier for the resource */
  id: Scalars["ID"];
  json: Scalars["String"];
  title: Scalars["String"];
  lines: Array<Line>;
  user: User;
  language: Language;
  isDraft: Scalars["Boolean"];
  replies: Array<Tweet>;
  createdAt?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["Date"]>;
  likeCount: Scalars["Int"];
  likedByMe: Scalars["Boolean"];
};

export type PostInput = {
  language: Scalars["Int"];
  lines: Array<LineInput>;
  isDraft: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  search: Array<Post>;
  feed: Array<Post>;
  posts: Array<Post>;
  post: Post;
  tweet: Tweet;
  replies: Array<Tweet>;
  langs: Array<Language>;
  viewer: User;
  user: User;
};

export type QuerySearchArgs = {
  query: SearchInput;
};

export type QueryPostArgs = {
  id: Scalars["ID"];
};

export type QueryTweetArgs = {
  id: Scalars["ID"];
};

export type QueryRepliesArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  username: Scalars["String"];
};

/** Anything that can be replied */
export type Repliable = Tweet | Line;

export type SearchInput = {
  language?: Maybe<Scalars["Int"]>;
};

export type Tweet = Node & {
  __typename?: "Tweet";
  /** Unique identifier for the resource */
  id: Scalars["ID"];
  text: Scalars["String"];
  inReplyTo?: Maybe<Scalars["Int"]>;
  postedBy: User;
  post: Post;
  replies: Array<Tweet>;
  createdAt?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["Date"]>;
  likeCount: Scalars["Int"];
  likedByMe: Scalars["Boolean"];
};

export type TweetInput = {
  inReplyTo: Scalars["ID"];
  postId: Scalars["ID"];
  text: Scalars["String"];
};

export type User = Node & {
  __typename?: "User";
  /** Unique identifier for the resource */
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  fluentLanguages: Array<Scalars["Int"]>;
  learningLanguages: Array<Scalars["Int"]>;
  posts: Array<Post>;
  createdAt?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type UserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  fluentLanguages: Array<Scalars["Int"]>;
  learningLanguages: Array<Scalars["Int"]>;
};

export type TweetFieldFragment = { __typename?: "Tweet" } & Pick<
  Tweet,
  "id" | "text" | "updatedAt" | "likeCount" | "likedByMe"
>;

export type LineFieldFragment = { __typename?: "Line" } & Pick<Line, "id"> & {
    partialLines: Array<
      { __typename?: "PartialLine" } & Pick<PartialLine, "text">
    >;
    replies: Array<{ __typename?: "Tweet" } & TweetFieldFragment>;
  };

export type PostFieldFragment = { __typename?: "Post" } & Pick<
  Post,
  "id" | "title" | "json" | "isDraft" | "updatedAt" | "likedByMe" | "likeCount"
> & {
    lines: Array<
      { __typename?: "Line" } & Pick<Line, "id"> & {
          partialLines: Array<
            { __typename?: "PartialLine" } & Pick<PartialLine, "text">
          >;
          replies: Array<{ __typename?: "Tweet" } & TweetFieldFragment>;
        }
    >;
    language: { __typename?: "Language" } & Pick<Language, "id" | "name">;
    user: { __typename?: "User" } & Pick<User, "username">;
  };

export type FetchViewerQueryVariables = {};

export type FetchViewerQuery = { __typename?: "Query" } & {
  viewer: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "email" | "fluentLanguages" | "learningLanguages"
  > & {
      posts: Array<
        { __typename?: "Post" } & Pick<Post, "id" | "title" | "updatedAt"> & {
            language: { __typename?: "Language" } & Pick<
              Language,
              "id" | "name"
            >;
            user: { __typename?: "User" } & Pick<User, "username">;
          }
      >;
    };
};

export type FetchUserByUsernameQueryVariables = {
  username: Scalars["String"];
};

export type FetchUserByUsernameQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "email" | "fluentLanguages" | "learningLanguages"
  > & {
      posts: Array<
        { __typename?: "Post" } & Pick<Post, "id" | "title" | "updatedAt"> & {
            language: { __typename?: "Language" } & Pick<
              Language,
              "id" | "name"
            >;
            user: { __typename?: "User" } & Pick<User, "username">;
          }
      >;
    };
};

export type FetchPostByIdQueryVariables = {
  id: Scalars["ID"];
};

export type FetchPostByIdQuery = { __typename?: "Query" } & {
  post: { __typename?: "Post" } & PostFieldFragment;
};

export type FetchFeedForUserQueryVariables = {};

export type FetchFeedForUserQuery = { __typename?: "Query" } & {
  feed: Array<{ __typename?: "Post" } & PostFieldFragment>;
};

export type FetchSearchResultQueryVariables = {
  query: SearchInput;
};

export type FetchSearchResultQuery = { __typename?: "Query" } & {
  search: Array<{ __typename?: "Post" } & PostFieldFragment>;
};

export type FetchLanguagesQueryVariables = {};

export type FetchLanguagesQuery = { __typename?: "Query" } & {
  langs: Array<{ __typename?: "Language" } & Pick<Language, "id" | "name">>;
};

export type FetchTweetsForLineQueryVariables = {
  id: Scalars["ID"];
};

export type FetchTweetsForLineQuery = { __typename?: "Query" } & {
  replies: Array<{ __typename?: "Tweet" } & TweetFieldFragment>;
};

export type PostUpdateMutationVariables = {
  id: Scalars["ID"];
  post: PostInput;
};

export type PostUpdateMutation = { __typename?: "Mutation" } & {
  postUpdate: { __typename?: "Post" } & PostFieldFragment;
};

export type PostCreateMutationVariables = {
  post: PostInput;
};

export type PostCreateMutation = { __typename?: "Mutation" } & {
  postCreate: { __typename?: "Post" } & Pick<Post, "id">;
};

export type PostLikeMutationVariables = {
  id: Scalars["ID"];
};

export type PostLikeMutation = { __typename?: "Mutation" } & {
  postLike: { __typename?: "Post" } & PostFieldFragment;
};

export type UserUpdateMutationVariables = {
  user: UserInput;
};

export type UserUpdateMutation = { __typename?: "Mutation" } & {
  userUpdate: { __typename?: "User" } & Pick<
    User,
    "id" | "email" | "username" | "fluentLanguages" | "learningLanguages"
  >;
};

export type TweetCreateMutationVariables = {
  tweet: TweetInput;
};

export type TweetCreateMutation = { __typename?: "Mutation" } & {
  tweetCreate: { __typename?: "Tweet" } & Pick<Tweet, "id">;
};

export type TweetLikeMutationVariables = {
  id: Scalars["ID"];
};

export type TweetLikeMutation = { __typename?: "Mutation" } & {
  tweetLike: { __typename?: "Tweet" } & TweetFieldFragment;
};

export const TweetFieldFragmentDoc = gql`
  fragment tweetField on Tweet {
    id
    text
    updatedAt
    likeCount
    likedByMe
  }
`;
export const LineFieldFragmentDoc = gql`
  fragment lineField on Line {
    id
    partialLines {
      text
    }
    replies {
      ...tweetField
    }
  }
  ${TweetFieldFragmentDoc}
`;
export const PostFieldFragmentDoc = gql`
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
    updatedAt
    likedByMe
    likeCount
  }
  ${TweetFieldFragmentDoc}
`;
export const FetchViewerDocument = gql`
  query fetchViewer {
    viewer {
      id
      username
      email
      fluentLanguages
      learningLanguages
      posts {
        id
        title
        language {
          id
          name
        }
        user {
          username
        }
        updatedAt
      }
    }
  }
`;

/**
 * __useFetchViewerQuery__
 *
 * To run a query within a React component, call `useFetchViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchViewerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchViewerQuery,
    FetchViewerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<FetchViewerQuery, FetchViewerQueryVariables>(
    FetchViewerDocument,
    baseOptions
  );
}
export function useFetchViewerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchViewerQuery,
    FetchViewerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchViewerQuery,
    FetchViewerQueryVariables
  >(FetchViewerDocument, baseOptions);
}
export type FetchViewerQueryHookResult = ReturnType<typeof useFetchViewerQuery>;
export type FetchViewerLazyQueryHookResult = ReturnType<
  typeof useFetchViewerLazyQuery
>;
export type FetchViewerQueryResult = ApolloReactCommon.QueryResult<
  FetchViewerQuery,
  FetchViewerQueryVariables
>;
export const FetchUserByUsernameDocument = gql`
  query fetchUserByUsername($username: String!) {
    user(username: $username) {
      id
      username
      email
      fluentLanguages
      learningLanguages
      posts {
        id
        title
        language {
          id
          name
        }
        user {
          username
        }
        updatedAt
      }
    }
  }
`;

/**
 * __useFetchUserByUsernameQuery__
 *
 * To run a query within a React component, call `useFetchUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFetchUserByUsernameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchUserByUsernameQuery,
    FetchUserByUsernameQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchUserByUsernameQuery,
    FetchUserByUsernameQueryVariables
  >(FetchUserByUsernameDocument, baseOptions);
}
export function useFetchUserByUsernameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchUserByUsernameQuery,
    FetchUserByUsernameQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchUserByUsernameQuery,
    FetchUserByUsernameQueryVariables
  >(FetchUserByUsernameDocument, baseOptions);
}
export type FetchUserByUsernameQueryHookResult = ReturnType<
  typeof useFetchUserByUsernameQuery
>;
export type FetchUserByUsernameLazyQueryHookResult = ReturnType<
  typeof useFetchUserByUsernameLazyQuery
>;
export type FetchUserByUsernameQueryResult = ApolloReactCommon.QueryResult<
  FetchUserByUsernameQuery,
  FetchUserByUsernameQueryVariables
>;
export const FetchPostByIdDocument = gql`
  query fetchPostById($id: ID!) {
    post(id: $id) {
      ...postField
    }
  }
  ${PostFieldFragmentDoc}
`;

/**
 * __useFetchPostByIdQuery__
 *
 * To run a query within a React component, call `useFetchPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchPostByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchPostByIdQuery,
    FetchPostByIdQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchPostByIdQuery,
    FetchPostByIdQueryVariables
  >(FetchPostByIdDocument, baseOptions);
}
export function useFetchPostByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchPostByIdQuery,
    FetchPostByIdQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchPostByIdQuery,
    FetchPostByIdQueryVariables
  >(FetchPostByIdDocument, baseOptions);
}
export type FetchPostByIdQueryHookResult = ReturnType<
  typeof useFetchPostByIdQuery
>;
export type FetchPostByIdLazyQueryHookResult = ReturnType<
  typeof useFetchPostByIdLazyQuery
>;
export type FetchPostByIdQueryResult = ApolloReactCommon.QueryResult<
  FetchPostByIdQuery,
  FetchPostByIdQueryVariables
>;
export const FetchFeedForUserDocument = gql`
  query fetchFeedForUser {
    feed {
      ...postField
    }
  }
  ${PostFieldFragmentDoc}
`;

/**
 * __useFetchFeedForUserQuery__
 *
 * To run a query within a React component, call `useFetchFeedForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchFeedForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchFeedForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchFeedForUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchFeedForUserQuery,
    FetchFeedForUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchFeedForUserQuery,
    FetchFeedForUserQueryVariables
  >(FetchFeedForUserDocument, baseOptions);
}
export function useFetchFeedForUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchFeedForUserQuery,
    FetchFeedForUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchFeedForUserQuery,
    FetchFeedForUserQueryVariables
  >(FetchFeedForUserDocument, baseOptions);
}
export type FetchFeedForUserQueryHookResult = ReturnType<
  typeof useFetchFeedForUserQuery
>;
export type FetchFeedForUserLazyQueryHookResult = ReturnType<
  typeof useFetchFeedForUserLazyQuery
>;
export type FetchFeedForUserQueryResult = ApolloReactCommon.QueryResult<
  FetchFeedForUserQuery,
  FetchFeedForUserQueryVariables
>;
export const FetchSearchResultDocument = gql`
  query fetchSearchResult($query: SearchInput!) {
    search(query: $query) {
      ...postField
    }
  }
  ${PostFieldFragmentDoc}
`;

/**
 * __useFetchSearchResultQuery__
 *
 * To run a query within a React component, call `useFetchSearchResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSearchResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSearchResultQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFetchSearchResultQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchSearchResultQuery,
    FetchSearchResultQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchSearchResultQuery,
    FetchSearchResultQueryVariables
  >(FetchSearchResultDocument, baseOptions);
}
export function useFetchSearchResultLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchSearchResultQuery,
    FetchSearchResultQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchSearchResultQuery,
    FetchSearchResultQueryVariables
  >(FetchSearchResultDocument, baseOptions);
}
export type FetchSearchResultQueryHookResult = ReturnType<
  typeof useFetchSearchResultQuery
>;
export type FetchSearchResultLazyQueryHookResult = ReturnType<
  typeof useFetchSearchResultLazyQuery
>;
export type FetchSearchResultQueryResult = ApolloReactCommon.QueryResult<
  FetchSearchResultQuery,
  FetchSearchResultQueryVariables
>;
export const FetchLanguagesDocument = gql`
  query fetchLanguages {
    langs {
      id
      name
    }
  }
`;

/**
 * __useFetchLanguagesQuery__
 *
 * To run a query within a React component, call `useFetchLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchLanguagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchLanguagesQuery,
    FetchLanguagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchLanguagesQuery,
    FetchLanguagesQueryVariables
  >(FetchLanguagesDocument, baseOptions);
}
export function useFetchLanguagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchLanguagesQuery,
    FetchLanguagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchLanguagesQuery,
    FetchLanguagesQueryVariables
  >(FetchLanguagesDocument, baseOptions);
}
export type FetchLanguagesQueryHookResult = ReturnType<
  typeof useFetchLanguagesQuery
>;
export type FetchLanguagesLazyQueryHookResult = ReturnType<
  typeof useFetchLanguagesLazyQuery
>;
export type FetchLanguagesQueryResult = ApolloReactCommon.QueryResult<
  FetchLanguagesQuery,
  FetchLanguagesQueryVariables
>;
export const FetchTweetsForLineDocument = gql`
  query fetchTweetsForLine($id: ID!) {
    replies(id: $id) {
      ...tweetField
    }
  }
  ${TweetFieldFragmentDoc}
`;

/**
 * __useFetchTweetsForLineQuery__
 *
 * To run a query within a React component, call `useFetchTweetsForLineQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTweetsForLineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTweetsForLineQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchTweetsForLineQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FetchTweetsForLineQuery,
    FetchTweetsForLineQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FetchTweetsForLineQuery,
    FetchTweetsForLineQueryVariables
  >(FetchTweetsForLineDocument, baseOptions);
}
export function useFetchTweetsForLineLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchTweetsForLineQuery,
    FetchTweetsForLineQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FetchTweetsForLineQuery,
    FetchTweetsForLineQueryVariables
  >(FetchTweetsForLineDocument, baseOptions);
}
export type FetchTweetsForLineQueryHookResult = ReturnType<
  typeof useFetchTweetsForLineQuery
>;
export type FetchTweetsForLineLazyQueryHookResult = ReturnType<
  typeof useFetchTweetsForLineLazyQuery
>;
export type FetchTweetsForLineQueryResult = ApolloReactCommon.QueryResult<
  FetchTweetsForLineQuery,
  FetchTweetsForLineQueryVariables
>;
export const PostUpdateDocument = gql`
  mutation postUpdate($id: ID!, $post: PostInput!) {
    postUpdate(id: $id, post: $post) {
      ...postField
    }
  }
  ${PostFieldFragmentDoc}
`;
export type PostUpdateMutationFn = ApolloReactCommon.MutationFunction<
  PostUpdateMutation,
  PostUpdateMutationVariables
>;

/**
 * __usePostUpdateMutation__
 *
 * To run a mutation, you first call `usePostUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postUpdateMutation, { data, loading, error }] = usePostUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      post: // value for 'post'
 *   },
 * });
 */
export function usePostUpdateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostUpdateMutation,
    PostUpdateMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostUpdateMutation,
    PostUpdateMutationVariables
  >(PostUpdateDocument, baseOptions);
}
export type PostUpdateMutationHookResult = ReturnType<
  typeof usePostUpdateMutation
>;
export type PostUpdateMutationResult = ApolloReactCommon.MutationResult<
  PostUpdateMutation
>;
export type PostUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostUpdateMutation,
  PostUpdateMutationVariables
>;
export const PostCreateDocument = gql`
  mutation postCreate($post: PostInput!) {
    postCreate(post: $post) {
      id
    }
  }
`;
export type PostCreateMutationFn = ApolloReactCommon.MutationFunction<
  PostCreateMutation,
  PostCreateMutationVariables
>;

/**
 * __usePostCreateMutation__
 *
 * To run a mutation, you first call `usePostCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCreateMutation, { data, loading, error }] = usePostCreateMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function usePostCreateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostCreateMutation,
    PostCreateMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostCreateMutation,
    PostCreateMutationVariables
  >(PostCreateDocument, baseOptions);
}
export type PostCreateMutationHookResult = ReturnType<
  typeof usePostCreateMutation
>;
export type PostCreateMutationResult = ApolloReactCommon.MutationResult<
  PostCreateMutation
>;
export type PostCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostCreateMutation,
  PostCreateMutationVariables
>;
export const PostLikeDocument = gql`
  mutation postLike($id: ID!) {
    postLike(id: $id) {
      ...postField
    }
  }
  ${PostFieldFragmentDoc}
`;
export type PostLikeMutationFn = ApolloReactCommon.MutationFunction<
  PostLikeMutation,
  PostLikeMutationVariables
>;

/**
 * __usePostLikeMutation__
 *
 * To run a mutation, you first call `usePostLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postLikeMutation, { data, loading, error }] = usePostLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostLikeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PostLikeMutation,
    PostLikeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PostLikeMutation,
    PostLikeMutationVariables
  >(PostLikeDocument, baseOptions);
}
export type PostLikeMutationHookResult = ReturnType<typeof usePostLikeMutation>;
export type PostLikeMutationResult = ApolloReactCommon.MutationResult<
  PostLikeMutation
>;
export type PostLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PostLikeMutation,
  PostLikeMutationVariables
>;
export const UserUpdateDocument = gql`
  mutation userUpdate($user: UserInput!) {
    userUpdate(user: $user) {
      id
      email
      username
      fluentLanguages
      learningLanguages
    }
  }
`;
export type UserUpdateMutationFn = ApolloReactCommon.MutationFunction<
  UserUpdateMutation,
  UserUpdateMutationVariables
>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUserUpdateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UserUpdateMutation,
    UserUpdateMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UserUpdateMutation,
    UserUpdateMutationVariables
  >(UserUpdateDocument, baseOptions);
}
export type UserUpdateMutationHookResult = ReturnType<
  typeof useUserUpdateMutation
>;
export type UserUpdateMutationResult = ApolloReactCommon.MutationResult<
  UserUpdateMutation
>;
export type UserUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UserUpdateMutation,
  UserUpdateMutationVariables
>;
export const TweetCreateDocument = gql`
  mutation tweetCreate($tweet: TweetInput!) {
    tweetCreate(tweet: $tweet) {
      id
    }
  }
`;
export type TweetCreateMutationFn = ApolloReactCommon.MutationFunction<
  TweetCreateMutation,
  TweetCreateMutationVariables
>;

/**
 * __useTweetCreateMutation__
 *
 * To run a mutation, you first call `useTweetCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTweetCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tweetCreateMutation, { data, loading, error }] = useTweetCreateMutation({
 *   variables: {
 *      tweet: // value for 'tweet'
 *   },
 * });
 */
export function useTweetCreateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TweetCreateMutation,
    TweetCreateMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TweetCreateMutation,
    TweetCreateMutationVariables
  >(TweetCreateDocument, baseOptions);
}
export type TweetCreateMutationHookResult = ReturnType<
  typeof useTweetCreateMutation
>;
export type TweetCreateMutationResult = ApolloReactCommon.MutationResult<
  TweetCreateMutation
>;
export type TweetCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TweetCreateMutation,
  TweetCreateMutationVariables
>;
export const TweetLikeDocument = gql`
  mutation tweetLike($id: ID!) {
    tweetLike(id: $id) {
      ...tweetField
    }
  }
  ${TweetFieldFragmentDoc}
`;
export type TweetLikeMutationFn = ApolloReactCommon.MutationFunction<
  TweetLikeMutation,
  TweetLikeMutationVariables
>;

/**
 * __useTweetLikeMutation__
 *
 * To run a mutation, you first call `useTweetLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTweetLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tweetLikeMutation, { data, loading, error }] = useTweetLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTweetLikeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TweetLikeMutation,
    TweetLikeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    TweetLikeMutation,
    TweetLikeMutationVariables
  >(TweetLikeDocument, baseOptions);
}
export type TweetLikeMutationHookResult = ReturnType<
  typeof useTweetLikeMutation
>;
export type TweetLikeMutationResult = ApolloReactCommon.MutationResult<
  TweetLikeMutation
>;
export type TweetLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TweetLikeMutation,
  TweetLikeMutationVariables
>;
