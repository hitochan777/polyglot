import { inputObjectType } from "@nexus/schema";

export const UserSettingInput = inputObjectType({
  name: "UserSettingInput",
  definition(t) {
    t.list.field("fluentLanguages", {
      type: "String",
      nullable: false,
    });
    t.list.field("learningLanguages", {
      type: "String",
      nullable: false,
    });
    t.string("timezone");
  },
});
