import React from "react";
import styled from "styled-components";

import { GlobalStyle } from "./global-style";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { FillInModal } from "../components/FillInModal";
import { useViewer } from "@/hooks/useViewer";
import { useUid } from "@/store";
import { useLoading } from "@/store";

const LoadingWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Layout: React.FC = ({ children }) => {
  const uid = useUid();
  const globalLoading = useLoading();
  const { viewer, loading: queryLoading } = useViewer();
  const loading = globalLoading || queryLoading;
  if (loading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }
  let shouldShowFillInfoModal = false;
  let formData;
  if (uid) {
    if (!viewer) {
      throw new Error("Unexpected error");
    }

    const { email, username, learningLanguages, fluentLanguages } = viewer;
    const isInfoEmpty =
      email.length === 0 ||
      username.length === 0 ||
      learningLanguages.length === 0 ||
      fluentLanguages.length === 0;

    if (uid && isInfoEmpty) {
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
