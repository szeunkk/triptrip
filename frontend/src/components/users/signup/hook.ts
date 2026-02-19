import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { createUserFormSchema, CreateUserFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { CreateUserDocument } from "@/commons/graphql/graphql";
import { Modal } from "antd";

export default function useSignupForm() {
  // 0. 세팅
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // 1. useForm 세팅
  const { register, handleSubmit, formState } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
  });

  // 2. 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. API 요청 세팅
  const [createUser] = useMutation(CreateUserDocument);

  // 4. 함수
  const onClickSignup = async (data: CreateUserFormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const createUserInput = { email: data.email, name: data.name, password: data.password };

    try {
      await createUser({
        variables: { createUserInput },
      });

      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({
          title: "회원가입에 실패하였습니다.",
          content: error.message,
        });
      } else {
        Modal.error({
          title: "회원가입에 실패하였습니다.",
          content: "알 수 없는 에러가 발생하였습니다.",
        });
      }
    }
  };

  const onClickLogin = () => {
    router.push(`/login?redirect=${redirect}`);
  };

  return {
    register,
    handleSubmit,
    formState,
    isModalOpen,
    onClickSignup,
    onClickLogin,
  };
}
