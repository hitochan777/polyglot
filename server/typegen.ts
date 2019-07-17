/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */

import * as ctx from "./types"


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserInput: { // input type
    email?: string | null; // String
    fluentLangs?: string[] | null; // [String!]
    learningLangs?: string[] | null; // [String!]
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthData: { // root type
    token: string; // String!
  }
  Line: { // root type
    id: string; // ID!
    post: NexusGenRootTypes['Post']; // Post!
    text: string; // String!
    tweets: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
  }
  Mutation: {};
  Post: { // root type
    id: string; // ID!
    lang: string; // String!
    lines: NexusGenRootTypes['Line'][]; // [Line!]!
    user: NexusGenRootTypes['User']; // User!
  }
  Query: {};
  Tweet: { // root type
    id: string; // ID!
    line: NexusGenRootTypes['Line']; // Line!
    parentTweet: NexusGenRootTypes['Tweet']; // Tweet!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    text: string; // String!
  }
  User: { // root type
    email: string; // String!
    fluentLangs: number[]; // [Int!]!
    id: string; // ID!
    learningLangs: number[]; // [Int!]!
    username: string; // String!
  }
  Node: NexusGenRootTypes['Post'] | NexusGenRootTypes['Line'] | NexusGenRootTypes['Tweet'] | NexusGenRootTypes['User'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  UserInput: NexusGenInputs['UserInput'];
}

export interface NexusGenFieldTypes {
  AuthData: { // field return type
    token: string; // String!
  }
  Line: { // field return type
    id: string; // ID!
    post: NexusGenRootTypes['Post']; // Post!
    text: string; // String!
    tweets: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
  }
  Mutation: { // field return type
    logout: boolean; // Boolean!
    signin: NexusGenRootTypes['AuthData']; // AuthData!
    userCreate: NexusGenRootTypes['User']; // User!
    userUpdate: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    id: string; // ID!
    lang: string; // String!
    lines: NexusGenRootTypes['Line'][]; // [Line!]!
    user: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    langs: NexusGenRootTypes['Post'][]; // [Post!]!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    viewer: NexusGenRootTypes['User']; // User!
  }
  Tweet: { // field return type
    id: string; // ID!
    line: NexusGenRootTypes['Line']; // Line!
    parentTweet: NexusGenRootTypes['Tweet']; // Tweet!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    text: string; // String!
  }
  User: { // field return type
    email: string; // String!
    fluentLangs: number[]; // [Int!]!
    id: string; // ID!
    learningLangs: number[]; // [Int!]!
    username: string; // String!
  }
  Node: { // field return type
    id: string; // ID!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    signin: { // args
      token: string; // String!
    }
    userCreate: { // args
      id: string; // String!
    }
    userUpdate: { // args
      id: string; // String!
      user: NexusGenInputs['UserInput']; // UserInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  Node: "Post" | "Line" | "Tweet" | "User"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthData" | "Line" | "Mutation" | "Post" | "Query" | "Tweet" | "User";

export type NexusGenInputNames = "UserInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = "Node";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.GraphQLContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}