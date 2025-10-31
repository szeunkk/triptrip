"use client";

import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ========================================
// GraphQL Queries & Mutations
// ========================================

/**
 * GraphQL Mutation 정의
 * createUser mutation을 사용하여 회원가입을 수행합니다.
 */
const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

// ========================================
// Zod Schema
// ========================================

/**
 * 회원가입 폼 검증 스키마
 * - email: '@' 포함 필수
 * - name: 최소 1글자 이상 필수
 * - password: 최소 8글자 이상 필수
 * - passwordConfirm: password와 동일 여부
 */
const signupSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해 주세요.").includes("@", {
      message: "이메일을 입력해 주세요.",
    }),
    name: z.string().min(1, "이름을 입력해 주세요."),
    password: z.string().min(8, "비밀번호를 입력해 주세요."),
    passwordConfirm: z.string().min(1, "비밀번호를 한번 더 입력해 주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호를 입력해 주세요.",
    path: ["passwordConfirm"],
  });

/**
 * 회원가입 폼 데이터 타입
 */
export type ISignupFormData = z.infer<typeof signupSchema>;

// ========================================
// Types
// ========================================

/**
 * createUser mutation 변수 타입
 */
export interface ICreateUserInput {
  email: string;
  name: string;
  password: string;
}

/**
 * createUser mutation 응답 타입
 */
export interface ICreateUserResponse {
  createUser: {
    _id: string;
  };
}

/**
 * useSignupForm 훅 반환 타입
 */
export interface IUseSignupFormReturn {
  register: ReturnType<typeof useForm<ISignupFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<ISignupFormData>>["handleSubmit"];
  formState: ReturnType<typeof useForm<ISignupFormData>>["formState"];
  onSubmit: (data: ISignupFormData) => Promise<void>;
  data: ICreateUserResponse | null | undefined;
  loading: boolean;
  error: string | null;
}

// ========================================
// Custom Hook
// ========================================

/**
 * 회원가입 폼을 관리하는 커스텀 훅
 * react-hook-form, zod, Apollo Client를 사용하여 회원가입 폼을 관리합니다.
 *
 * 주요 기능:
 * 1. 회원가입 폼 상태 관리 (react-hook-form)
 * 2. 폼 검증 (zod)
 * 3. 회원가입 API 호출 (Apollo Client useMutation)
 *
 * @returns {IUseSignupFormReturn} 회원가입 폼 관리 객체
 * @returns {Function} register - react-hook-form의 input 등록 함수
 * @returns {Function} handleSubmit - react-hook-form의 submit 핸들러
 * @returns {Object} formState - 폼 상태 객체
 * @returns {Function} onSubmit - 회원가입 제출 핸들러
 * @returns {Object | null | undefined} data - 회원가입 결과 데이터
 * @returns {boolean} loading - 로딩 상태
 * @returns {string | null} error - 에러 메시지
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, formState, onSubmit, loading } = useSignupForm();
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <input {...register("email")} />
 *   <input {...register("name")} />
 *   <input {...register("password")} type="password" />
 *   <button type="submit" disabled={loading}>회원가입</button>
 * </form>
 * ```
 */
export function useSignupForm(): IUseSignupFormReturn {
  // 1. React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<ISignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  // 2. Apollo Client useMutation
  const [createUser, { data, loading, error: apolloError }] =
    useMutation<ICreateUserResponse>(CREATE_USER);

  // 3. 에러 메시지 처리
  const error = apolloError
    ? apolloError.message
    : errors.email?.message ||
      errors.name?.message ||
      errors.password?.message ||
      errors.passwordConfirm?.message ||
      null;

  /**
   * 회원가입 폼 제출 핸들러
   *
   * 처리 순서:
   * 1. 폼 데이터에서 createUserInput 구성
   * 2. createUser mutation 호출
   * 3. 에러 발생 시 콘솔 로그 출력
   *
   * @param formData - 폼 데이터 (email, name, password, passwordConfirm)
   */
  const onSubmit = async (formData: ISignupFormData) => {
    try {
      // 1. 폼 데이터에서 createUserInput 구성
      const createUserInput: ICreateUserInput = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      };

      // 2. createUser mutation 호출
      await createUser({
        variables: {
          createUserInput,
        },
      });
    } catch (err) {
      // 3. 에러 발생 시 콘솔 로그 출력
      console.error("회원가입 에러:", err);
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    onSubmit,
    data,
    loading,
    error,
  };
}
