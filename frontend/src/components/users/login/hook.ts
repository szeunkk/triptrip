import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUserFormSchema, LoginUserFormValues } from "./schema";
import { useAccessTokenStore } from "@/commons/stores/accessTokenStore";
import { ApolloError, useMutation } from "@apollo/client";
import { LoginUserDocument } from "@/commons/graphql/graphql";
import { jwtDecode } from "jwt-decode";
import { Modal } from "antd";
import { BaseSyntheticEvent } from "react";

export default function useLoginForm() {
  // 0. 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // 1. useForm세팅
  const { register, handleSubmit, formState } = useForm<LoginUserFormValues>({
    resolver: zodResolver(loginUserFormSchema),
    mode: "onChange",
  });

  // 2. 글로벌 state: setAccessToken
  const { setAccessToken } = useAccessTokenStore();

  // 3. API 요청 세팅
  const [loginUser] = useMutation(LoginUserDocument);

  // 4. 함수
  const onClickLogin = async (data: LoginUserFormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const { email, password } = data;

    try {
      const result = await loginUser({
        variables: { email, password },
      });

      const accessToken = result.data?.loginUser.accessToken ?? "";
      setAccessToken(accessToken);

      const decodedExp = String(jwtDecode(accessToken).exp);
      // freshToken 실습 전까지 localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("exp", decodedExp);

      router.push(redirect);
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({
          title: "로그인에 실패하였습니다.",
          content: error.message,
        });
      } else {
        Modal.error({
          title: "로그인에 실패하였습니다.",
          content: "알 수 없는 에러가 발생하였습니다.",
        });
      }
    }
  };

  const onClickSignup = () => {
    router.push(`/signup?redirect=${redirect}`);
  };

  return { register, handleSubmit, formState, onClickLogin, onClickSignup };
}
