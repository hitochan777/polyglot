import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import { GlobalStyle } from "./global-style";
import { useStateValue } from "../store";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { FillInModal } from "../components/FillInModal";
import { FETCH_VIEWER_QUERY } from "@/constant/graphql";
import { FetchViewerQuery } from "@/generated/types";

const LoadingWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Layout: React.FC = ({ children }) => {
  const { state } = useStateValue();
  const { data, error, loading: queryLoading } = useQuery<FetchViewerQuery>(
    FETCH_VIEWER_QUERY,
    { skip: state.user === null }
  );
  const loading = state.loading || (state.user && queryLoading);
  if (loading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }
  let shouldShowFillInfoModal = false;
  let formData;
  if (state.user) {
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error("Unexpected error");
    }

    const { email, username, learningLanguages, fluentLanguages } = data.viewer;
    const isInfoEmpty =
      email.length === 0 ||
      username.length === 0 ||
      learningLanguages.length === 0 ||
      fluentLanguages.length === 0;

    if (state.user && isInfoEmpty) {
      shouldShowFillInfoModal = true;
      formData = {
        email,
        username,
        learningLanguages: learningLanguages.map(l => `${l}`),
        fluentLanguages: fluentLanguages.map(l => `${l}`)
      };
    }
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <FillInModal open={shouldShowFillInfoModal} formData={formData} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
