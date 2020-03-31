import React from "react";
import { useFormik } from "formik";
import { Button } from "@material-ui/core";

import {
  useUserUpdateSettingMutation,
  useFetchTimezonesQuery,
} from "@/generated/types";
import { useViewer } from "@/hooks/useViewer";
import { useLanguages } from "@/hooks/useLanguages";
import { MultiSelect } from "@/components/molecule";
import Select from "@/components/Select";
import { assertIsDefined } from "@/lib/assert";

interface FormValues {
  learningLanguages: string[];
  fluentLanguages: string[];
  timezone: string;
}

export const UserSetting: React.FC = () => {
  const [
    updateUserSetting,
    { loading: isUpdating },
  ] = useUserUpdateSettingMutation();
  const { viewer, loading: viewerQueryLoading } = useViewer();
  const { languages, loading: languageQueryLoading } = useLanguages();
  const {
    data: timezoneData,
    loading: timezoneQueryLoading,
  } = useFetchTimezonesQuery();

  const formik = useFormik<FormValues>({
    initialValues: {
      learningLanguages: viewer?.learningLanguages.map((lang) => lang.id) ?? [],
      fluentLanguages: viewer?.fluentLanguages.map((lang) => lang.id) ?? [],
      timezone: viewer?.timezone.id ?? "",
    },
    onSubmit: async (values) => {
      await updateUserSetting({
        variables: {
          user: {
            fluentLanguages: values.fluentLanguages,
            learningLanguages: values.learningLanguages,
            timezone: values.timezone,
          },
        },
      });
    },
  });

  if (viewerQueryLoading || languageQueryLoading || timezoneQueryLoading) {
    return <div>loading...</div>;
  }

  assertIsDefined(languages);

  return (
    <form onSubmit={formik.handleSubmit}>
      <MultiSelect
        id="fluent-languages"
        value={formik.values.fluentLanguages}
        name="fluentLanguages"
        onChange={formik.handleChange}
        options={languages}
        label="Fluent Languages"
      />
      <MultiSelect
        id="learning-languages"
        name="learningLanguages"
        value={formik.values.learningLanguages}
        onChange={formik.handleChange}
        options={languages}
        label="Learning Languages"
      />
      <Select
        label="Timezone"
        onChange={(val) => formik.setFieldValue("timezone", val)}
        options={
          timezoneData?.timezones.map((tz) => ({
            label: `${tz.id} (${tz.offset})`,
            value: tz.id,
          })) || []
        }
        value={formik.values.timezone}
      />
      <Button type="submit" color="primary" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};
