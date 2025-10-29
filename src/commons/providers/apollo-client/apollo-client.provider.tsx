"use client";

import { ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ReactNode, useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";

interface IApolloClientProviderProps {
  children: ReactNode;
}

export const ApolloClientProvider = ({
  children,
}: IApolloClientProviderProps) => {
  const client = useMemo(() => {
    // 1. Upload Link 생성 (파일 업로드 지원)
    const uploadLink = createUploadLink({
      uri: "https://main-practice.codebootcamp.co.kr/graphql",
      headers: {
        "Apollo-Require-Preflight": "true",
      },
    });

    // 2. Auth Link 생성 (accessToken을 header에 추가)
    const authLink = setContext((_, { headers }) => {
      // localStorage에서 accessToken 가져오기
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    // 3. Error Link 생성 (에러 핸들링 및 refresh token 처리)
    const errorLink = onError((errorResponse) => {
      const { graphQLErrors, networkError } = errorResponse;
      // GraphQL 에러 처리
      if (graphQLErrors) {
        for (const error of graphQLErrors) {
          const errorMessage = error.message;

          // accessToken 만료 또는 인증 에러
          if (
            errorMessage.includes("인증") ||
            errorMessage.includes("Unauthenticated")
          ) {
            console.error("🔐 [GraphQL Auth Error]:", errorMessage);

            // refresh token을 사용한 accessToken 재발급 로직
            // 실제 프로덕션에서는 refresh token API를 호출하여 새로운 accessToken을 받아옵니다.
            // 여기서는 단순히 로그만 출력하고, 필요시 로그인 페이지로 리다이렉트 합니다.
            if (typeof window !== "undefined") {
              console.log("🔄 accessToken 갱신이 필요합니다.");
              // getNewAccessToken을 호출하여 새로운 토큰을 받아올 수 있습니다.
              // 토큰 갱신 실패 시 로그인 페이지로 이동
              // localStorage.removeItem("accessToken");
              // localStorage.removeItem("refreshToken");
              // window.location.href = "/login";
            }
          }

          console.error(
            `🚨 [GraphQL Error]: Message: ${errorMessage}, Location: ${JSON.stringify(
              error.locations
            )}, Path: ${error.path}`
          );
        }
      }

      // 네트워크 에러 처리
      if (networkError) {
        console.error(`🌐 [Network Error]: ${networkError}`);
      }
    });

    // 4. InMemoryCache 생성 (기본 캐시 설정)
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // 페이지네이션 처리 예시
            fetchBoards: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    });

    // 5. Apollo Client 생성
    return new ApolloClient({
      link: from([errorLink, authLink, uploadLink as ApolloLink]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
          errorPolicy: "all",
        },
        query: {
          fetchPolicy: "network-only",
          errorPolicy: "all",
        },
        mutate: {
          errorPolicy: "all",
        },
      },
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

// Refresh Token을 사용하여 새로운 accessToken 가져오기 (선택사항)
// 실제 프로덕션에서는 이 함수를 사용하여 refresh token API를 호출합니다.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getNewAccessToken(): Promise<string | null> {
  try {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    if (!refreshToken) {
      throw new Error("Refresh token이 존재하지 않습니다.");
    }

    // 실제 refresh token API 호출 예시
    // const response = await fetch("http://main-practice.codebootcamp.co.kr/graphql", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query: `
    //       mutation {
    //         restoreAccessToken
    //       }
    //     `,
    //   }),
    //   credentials: "include",
    // });

    // const result = await response.json();
    // const newAccessToken = result.data?.restoreAccessToken;

    // if (newAccessToken) {
    //   localStorage.setItem("accessToken", newAccessToken);
    //   return newAccessToken;
    // }

    console.log("🔄 Refresh token 로직은 필요시 구현하세요.");
    return null;
  } catch (error) {
    console.error("❌ getNewAccessToken Error:", error);
    return null;
  }
}
