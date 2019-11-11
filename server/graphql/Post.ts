import { objectType } from "nexus";

import * as value from "../value/language";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.implements("Node");
    t.string("json", {
      async resolve(root, _) {
        return JSON.stringify(root.content);
      }
    });
    t.list.field("lines", {
      type: "String",
      async resolve(root, _) {
        console.log(root.lines);
        return root.lines;
      }
    }),
      t.field("user", {
        type: "User",
        async resolve(root, args, { repositories: { userRepository } }) {
          const user = await userRepository.findById(root.userId);
          if (!user) {
            throw new Error("User not found");
          }
          return user;
        }
      });
    t.field("language", {
      type: "Language",
      resolve(root) {
        return {
          id: `${root.language}`,
          name: value.Language[root.language]
        };
      }
    });
    t.boolean("isDraft");
  }
});
