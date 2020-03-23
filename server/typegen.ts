/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */

import * as ctx from "./types"
import * as entity_correction_group from "./entity/correction_group"
import * as entity_line from "./entity/line"
import * as entity_post from "./entity/post"
import * as entity_tweet from "./entity/tweet"
import * as entity_user from "./entity/user"
import { core } from "nexus"
declare global {
  interface NexusGenCustomDefinitionMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    language<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "LanguageCode";
    timezone<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Timezone";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  LineInput: { // input type
    id?: string | null; // ID
    partialLines: NexusGenInputs['PartialLineInput'][]; // [PartialLineInput!]!
  }
  PartialLineInput: { // input type
    referes?: string[] | null; // [String!]
    subtext: string; // String!
  }
  PostInput: { // input type
    isDraft: boolean; // Boolean!
    language: string; // String!
    lines: NexusGenInputs['LineInput'][]; // [LineInput!]!
  }
  SearchInput: { // input type
    language?: string | null; // String
  }
  TweetInput: { // input type
    correction?: string | null; // String
    inReplyTo: string; // ID!
    postId: string; // ID!
    text: string; // String!
  }
  UserInput: { // input type
    email: string; // String!
    fluentLanguages: string[]; // [String!]!
    learningLanguages: string[]; // [String!]!
    username: string; // String!
  }
  UserSettingInput: { // input type
    fluentLanguages: string[]; // [String!]!
    learningLanguages: string[]; // [String!]!
    timezone?: any | null; // Timezone
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthData: { // root type
    token: string; // String!
  }
  CorrectionGroup: entity_correction_group.CorrectionGroup;
  Language: { // root type
    id: any; // LanguageCode!
    name: string; // String!
  }
  Line: entity_line.Line;
  Mutation: {};
  PartialLine: { // root type
    text: string; // String!
  }
  Post: entity_post.Post;
  Query: {};
  Tweet: entity_tweet.Tweet;
  User: entity_user.User;
  Node: NexusGenRootTypes['Post'] | NexusGenRootTypes['CorrectionGroup'] | NexusGenRootTypes['Tweet'] | NexusGenRootTypes['User'] | NexusGenRootTypes['Line'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Date: any;
  LanguageCode: any;
  Timezone: any;
  Repliable: NexusGenRootTypes['Line'] | NexusGenRootTypes['Tweet'];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  LineInput: NexusGenInputs['LineInput'];
  PartialLineInput: NexusGenInputs['PartialLineInput'];
  PostInput: NexusGenInputs['PostInput'];
  SearchInput: NexusGenInputs['SearchInput'];
  TweetInput: NexusGenInputs['TweetInput'];
  UserInput: NexusGenInputs['UserInput'];
  UserSettingInput: NexusGenInputs['UserSettingInput'];
}

export interface NexusGenFieldTypes {
  AuthData: { // field return type
    token: string; // String!
  }
  CorrectionGroup: { // field return type
    createdAt: any | null; // Date
    id: string; // ID!
    lineCorrections: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    post: NexusGenRootTypes['Post']; // Post!
    postedBy: NexusGenRootTypes['User']; // User!
    summaryComment: NexusGenRootTypes['Tweet'] | null; // Tweet
    updatedAt: any | null; // Date
  }
  Language: { // field return type
    id: any; // LanguageCode!
    name: string; // String!
  }
  Line: { // field return type
    id: string; // ID!
    partialLines: NexusGenRootTypes['PartialLine'][]; // [PartialLine!]!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
  }
  Mutation: { // field return type
    correctionGroupCreate: NexusGenRootTypes['CorrectionGroup']; // CorrectionGroup!
    logout: boolean; // Boolean!
    postCreate: NexusGenRootTypes['Post']; // Post!
    postLike: NexusGenRootTypes['Post']; // Post!
    postUpdate: NexusGenRootTypes['Post']; // Post!
    signin: NexusGenRootTypes['AuthData']; // AuthData!
    tweetCreate: NexusGenRootTypes['Tweet']; // Tweet!
    tweetLike: NexusGenRootTypes['Tweet']; // Tweet!
    userCreate: NexusGenRootTypes['User']; // User!
    userUpdate: NexusGenRootTypes['User']; // User!
    userUpdateSetting: NexusGenRootTypes['User']; // User!
  }
  PartialLine: { // field return type
    text: string; // String!
  }
  Post: { // field return type
    corrections: NexusGenRootTypes['CorrectionGroup'][]; // [CorrectionGroup!]!
    createdAt: any | null; // Date
    id: string; // ID!
    isDraft: boolean; // Boolean!
    json: string; // String!
    language: NexusGenRootTypes['Language']; // Language!
    likeCount: number; // Int!
    likedByMe: boolean; // Boolean!
    lines: NexusGenRootTypes['Line'][]; // [Line!]!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    title: string; // String!
    updatedAt: any | null; // Date
    user: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    langs: NexusGenRootTypes['Language'][]; // [Language!]!
    post: NexusGenRootTypes['Post']; // Post!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    search: NexusGenRootTypes['Post'][]; // [Post!]!
    tweet: NexusGenRootTypes['Tweet']; // Tweet!
    user: NexusGenRootTypes['User']; // User!
    viewer: NexusGenRootTypes['User']; // User!
  }
  Tweet: { // field return type
    correction: string | null; // String
    createdAt: any | null; // Date
    id: string; // ID!
    inReplyTo: number | null; // Int
    likeCount: number; // Int!
    likedByMe: boolean; // Boolean!
    post: NexusGenRootTypes['Post']; // Post!
    postedBy: NexusGenRootTypes['User']; // User!
    replies: NexusGenRootTypes['Tweet'][]; // [Tweet!]!
    text: string; // String!
    updatedAt: any | null; // Date
  }
  User: { // field return type
    createdAt: any | null; // Date
    email: string; // String!
    fluentLanguages: NexusGenRootTypes['Language'][]; // [Language!]!
    id: string; // ID!
    learningLanguages: NexusGenRootTypes['Language'][]; // [Language!]!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    timezone: any; // Timezone!
    updatedAt: any | null; // Date
    username: string; // String!
  }
  Node: { // field return type
    id: string; // ID!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    correctionGroupCreate: { // args
      corrections: NexusGenInputs['TweetInput'][]; // [TweetInput!]!
      summaryComment?: NexusGenInputs['TweetInput'] | null; // TweetInput
    }
    postCreate: { // args
      post: NexusGenInputs['PostInput']; // PostInput!
    }
    postLike: { // args
      id: string; // ID!
    }
    postUpdate: { // args
      id: string; // ID!
      post: NexusGenInputs['PostInput']; // PostInput!
    }
    signin: { // args
      token: string; // String!
    }
    tweetCreate: { // args
      tweet: NexusGenInputs['TweetInput']; // TweetInput!
    }
    tweetLike: { // args
      id: string; // ID!
    }
    userCreate: { // args
      id: string; // ID!
    }
    userUpdate: { // args
      user: NexusGenInputs['UserInput']; // UserInput!
    }
    userUpdateSetting: { // args
      user: NexusGenInputs['UserSettingInput']; // UserSettingInput!
    }
  }
  Query: {
    feed: { // args
      limit: number; // Int!
      offset: number; // Int!
    }
    langs: { // args
      relatedOnly?: boolean | null; // Boolean
    }
    post: { // args
      id: string; // ID!
    }
    replies: { // args
      id: string; // ID!
    }
    search: { // args
      query: NexusGenInputs['SearchInput']; // SearchInput!
    }
    tweet: { // args
      id: string; // ID!
    }
    user: { // args
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  Repliable: "Line" | "Tweet"
  Node: "Post" | "CorrectionGroup" | "Tweet" | "User" | "Line"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthData" | "CorrectionGroup" | "Language" | "Line" | "Mutation" | "PartialLine" | "Post" | "Query" | "Tweet" | "User";

export type NexusGenInputNames = "LineInput" | "PartialLineInput" | "PostInput" | "SearchInput" | "TweetInput" | "UserInput" | "UserSettingInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = "Node";

export type NexusGenScalarNames = "Boolean" | "Date" | "Float" | "ID" | "Int" | "LanguageCode" | "String" | "Timezone";

export type NexusGenUnionNames = "Repliable";

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