import { inputObjectType } from "@nexus/schema";

export const PartialLineInput = inputObjectType({
  name: "PartialLineInput",
  definition(t) {
    t.string("subtext", { required: true });
    t.list.field("referes", { type: "String", required: false });
  },
});
