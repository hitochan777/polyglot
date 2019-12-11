import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Layout from "@/layout/default";
import { Editor, useEditorState } from "@/components/molecule/Editor";
import LanguageSelector from "@/components/molecule/LanguageSelector";
import {
  POST_UPDATE_MUTATION,
  FETCH_POST_BY_ID_QUERY
} from "@/constant/graphql";
import {
  PostUpdateMutation,
  PostUpdateMutationVariables,
  FetchPostByIdQuery,
  FetchPostByIdQueryVariables
} from "@/generated/types";
import { transformToGql, transformfromGql } from "@/service/slate";

const useUpdatePost = () => {
  const [updatePost, { loading, error }] = useMutation<
    PostUpdateMutation,
    PostUpdateMutationVariables
  >(POST_UPDATE_MUTATION);
  return { updatePost, loading, error };
};

interface Props {
  id: string;
  username: string;
}

const PostEditPage: NextPage<Props> = ({ id, username }) => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading
  } = useQuery<FetchPostByIdQuery, FetchPostByIdQueryVariables>(
    FETCH_POST_BY_ID_QUERY,
    { variables: { id } }
  );
  const { value, setValue, selection, setSelection } = useEditorState();
  const [language, setLanguage] = useState<string>("");
  const {
    updatePost,
    loading: updatePostLoading,
    error: updatePostError
  } = useUpdatePost();
  useEffect(() => {
    if (!queryLoading && queryData) {
      const parsedEditorState = transformfromGql(queryData.post.lines);
      setValue(parsedEditorState);
      setLanguage(queryData.post.language.id);
    }
  }, [queryLoading, queryData]);

  const loading = updatePostLoading || queryLoading;

  const handleSubmit = async (isDraft = true) => {
    await updatePost({
      variables: {
        id,
        post: {
          lines: transformToGql(value),
          language: +language,
          isDraft
        }
      }
    });
    Router.push("/[username]/[postId]", `/${username}/${id}`);
  };

  useEffect(() => {
    if (queryError || updatePostError) {
      alert("I am sorry but something happened during submission");
    }
  }, [queryError, updatePostError]);

  return (
    <Layout>
      <Container maxWidth="sm">
        <LanguageSelector
          label="Language"
          value={language}
          onChange={value => {
            setLanguage(value);
          }}
        />
        <Box mt={4}>
          {/*<pre>{JSON.stringify(value, null, 2)}</pre>*/}
          <Editor
            value={value}
            setValue={setValue}
            selection={selection}
            setSelection={setSelection}
          />
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit(false);
            }}
            disabled={loading}
            color="secondary"
          >
            {loading ? "Submitting..." : "Publish"}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit(true);
            }}
            disabled={loading}
            color="primary"
          >
            {loading ? "Submitting..." : "Save as Draft"}
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

PostEditPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<{ id: string; username: string }> => {
  const { postId, username } = ctx.query;
  assert(typeof postId === "string");
  assert(typeof username === "string");
  return { id: postId, username };
};

export default PostEditPage;