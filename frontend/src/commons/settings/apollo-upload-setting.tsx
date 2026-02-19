"use client";

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useAccessTokenStore } from "../stores/accessTokenStore";
import { useEffect } from "react";

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloUploadSetting({ children }: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const isTokenValid = () => {
    const tokenExp = Number(localStorage.getItem("exp"));
    if (!tokenExp) return false;

    const now = Math.floor(Date.now() / 1000);

    return now < tokenExp;
  };

  useEffect(() => {
    if (!isTokenValid()) {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("exp", "");
    }

    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, [setAccessToken]);

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
