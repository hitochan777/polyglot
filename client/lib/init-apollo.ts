import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  ApolloLink,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import fetch from "isomorphic-unfetch";

interface ApolloInitOptions {
  getToken: () => string | undefined;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const isBrowser = typeof window !== "undefined";

const createAuthorizationLink = ({ getToken }: ApolloInitOptions) =>
  setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
  credentials: "same-origin",
  fetch,
});

const typeDefs = gql`
  extend type Query {
    loading: Boolean!
    errorMessage: String
  }

  extend type Mutation {
    setLoading(loading: Boolean!): Boolean!
    setErrorMessage(errorMessage: String): Boolean!
  }
`;

const create = (initialState: any = {}, options: ApolloInitOptions) => {
  const cache = new InMemoryCache().restore(initialState);
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations
              )}, Path: ${path}`
            )
          );
          cache.writeQuery({
            query: gql`
              query setErrorMessage {
                errorMessage @client
              }
            `,
            data: {
              errorMessage: graphQLErrors[0].message,
            },
          });
        }
        if (networkError) {
          console.error(`[Network error]: ${networkError}`);
        }
      }),
      createAuthorizationLink(options),
      httpLink,
    ]),
    cache,
    ssrMode: !isBrowser,
    resolvers: {
      Mutation: {
        setLoading: (_root, { loading }, { cache }) => {
          cache.writeQuery({
            query: gql`
              query setLoading {
                loading @client
              }
            `,
            data: {
              loading,
            },
          });
          return null;
        },
        setErrorMessage: (_root, { errorMessage }, { cache }) => {
          cache.writeQuery({
            query: gql`
              query setErrorMessage {
                errorMessage @client
              }
            `,
            data: {
              errorMessage,
            },
          });
          return null;
        },
      },
    },
    typeDefs,
  });
  return client;
};

const initApollo = (initialState: any = {}, options: ApolloInitOptions) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};

export default initApollo;
