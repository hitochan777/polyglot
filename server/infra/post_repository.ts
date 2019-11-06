import knex from "knex";

import { Post } from "../entity/post";
import { ID } from "../types";
import { Language } from "../value/language";

interface RawPost {
  id: number;
  userId: number;
  language: number;
  content: string;
  isDraft: boolean;
}

interface PostInput {
  userId: ID;
  language: number;
  content: string;
  isDraft: boolean;
}

interface RawRepliable {
  id: ID;
}

export class PostRepository {
  posts: () => knex.QueryBuilder<RawPost, RawPost[]>;
  repliables: () => knex.QueryBuilder<RawRepliable, RawRepliable[]>;
  constructor(db: knex) {
    this.posts = () => db("post");
    this.repliables = () => db("repliable");
  }
  async create({ userId, language, content, isDraft }: PostInput) {
    const repliableIds = await this.repliables().insert({});
    if (repliableIds.length == 0) {
      return null;
    }
    const ids = await this.posts().insert({
      id: repliableIds[0],
      userId,
      language,
      content,
      isDraft
    });
    if (ids.length === 0) {
      return null;
    }
    const post = await this.posts()
      .where("id", ids[0])
      .first();
    if (!post) {
      return null;
    }
    if (!Language[post.language]) {
      throw new Error(`Invalid language ID ${post.language}`);
    }
    return new Post(
      post.id,
      post.userId,
      post.language,
      JSON.parse(post.content),
      post.isDraft
    );
  }
  async update(
    id: number,
    { userId, language, content, isDraft }: Partial<PostInput>
  ) {
    const cnt = await this.posts()
      .where({ id })
      .update({
        userId,
        language,
        content,
        isDraft
      });

    if (cnt === 0) {
      return null;
    }
    const maybePost = await this.findById(id);
    if (!maybePost) {
      return null;
    }

    return new Post(
      maybePost.id,
      maybePost.userId,
      maybePost.language,
      maybePost.content,
      maybePost.isDraft
    );
  }

  async findByUser(userId: ID): Promise<Post[]> {
    const posts = await this.posts().where({
      userId
    });
    return posts.map(
      post =>
        new Post(
          post.id,
          post.userId,
          post.language,
          JSON.parse(post.content),
          post.isDraft
        )
    );
  }
  async findById(id: ID): Promise<Post | null> {
    const posts = await this.posts().where({
      id
    });
    if (posts.length > 1) {
      throw new Error("Multiple posts found");
    }
    if (posts.length === 0) {
      return null;
    }
    const post = posts[0];
    return new Post(
      post.id,
      post.userId,
      post.language,
      JSON.parse(post.content),
      post.isDraft
    );
  }
  async findByLanguages(langs: Language[]): Promise<Post[]> {
    const posts = await this.posts().whereIn("language", langs);
    return posts.map(
      post =>
        new Post(
          post.id,
          post.userId,
          post.language,
          JSON.parse(post.content),
          post.isDraft
        )
    );
  }
}
