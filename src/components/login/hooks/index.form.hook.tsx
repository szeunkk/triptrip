"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useAuth, IUser } from "@/commons/providers/auth/auth.provider";

// ========================================
// GraphQL Queries & Mutations
// ========================================

/**
 * GraphQL Mutation 정의
 * loginUser mutation을 사용하여 로그인을 수행합니다.
 */
const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

/**
 * GraphQL Query 정의
 * fetchUserLoggedIn query를 사용하여 로그인된 사용자 정보를 가져옵니다.
 */
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      name
    }
  }
`;

// ========================================
// Zod Schema
// ========================================

/**
 * 로그인 폼 검증 스키마
 * - email: '@' 포함 필수
 * - password: 최소 1글자 이상 필수
 */
const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해 주세요").includes("@", {
    message: "이메일을 입력해 주세요",
  }),
  password: z.string().min(1, "비밀번호를 입력해 주세요"),
});

/**
 * 로그인 폼 데이터 타입
 */
export type ILoginFormData = z.infer<typeof loginSchema>;

// ========================================
// Types
// ========================================

/**
 * loginUser mutation 응답 타입
 */
export interface ILoginUserResponse {
  loginUser: {
    accessToken: string;
  };
}

/**
 * fetchUserLoggedIn query 응답 타입
 */
export interface IFetchUserLoggedInResponse {
  fetchUserLoggedIn: IUser;
}

/**
 * useLoginForm 훅 반환 타입
 */
export interface IUseLoginFormReturn {
  register: ReturnType<typeof useForm<ILoginFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<ILoginFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ILoginFormData>>["formState"]["errors"];
  onSubmit: (data: ILoginFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// ========================================
// Custom Hook
// ========================================

/**
 * 로그인 폼을 관리하는 커스텀 훅
 * react-hook-form, zod, Apollo Client, AuthProvider를 사용하여 로그인 폼을 관리합니다.
 *
 * 주요 기능:
 * 1. 로그인 폼 상태 관리 (react-hook-form)
 * 2. 폼 검증 (zod)
 * 3. 로그인 API 호출 (Apollo Client useMutation)
 * 4. 사용자 정보 조회 API 호출 (Apollo Client useLazyQuery)
 * 5. AuthProvider를 통한 인증 상태 관리 (localStorage 저장 + 전역 상태 업데이트)
 * 6. 로그인 성공 시 페이지 이동 (redirect 쿼리스트링 지원)
 *
 * @returns {IUseLoginFormReturn} 로그인 폼 관리 객체
 * @returns {Function} register - react-hook-form의 input 등록 함수
 * @returns {Function} handleSubmit - react-hook-form의 submit 핸들러
 * @returns {Object} errors - 폼 검증 에러 객체
 * @returns {Function} onSubmit - 로그인 제출 핸들러
 * @returns {boolean} loading - 로딩 상태 (로그인 중 또는 사용자 정보 조회 중)
 * @returns {string | null} error - 에러 메시지
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <input {...register("email")} />
 *   <input {...register("password")} type="password" />
 *   <button type="submit" disabled={loading}>로그인</button>
 * </form>
 * ```
 */
export function useLoginForm(): IUseLoginFormReturn {
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [loginUser, { loading: loginLoading, error: loginError }] =
    useMutation<ILoginUserResponse>(LOGIN_USER);

  const [
    fetchUserLoggedIn,
    { loading: fetchUserLoading, error: fetchUserError },
  ] = useLazyQuery<IFetchUserLoggedInResponse>(FETCH_USER_LOGGED_IN);

  const loading = loginLoading || fetchUserLoading;
  const error = loginError?.message || fetchUserError?.message || null;

  /**
   * 로그인 폼 제출 핸들러
   *
   * 처리 순서:
   * 1. loginUser API 호출하여 accessToken 획득
   * 2. localStorage에 accessToken 저장 (ApolloClient가 사용할 수 있도록)
   * 3. fetchUserLoggedIn API 호출하여 사용자 정보 획득
   * 4. AuthProvider의 login 메서드 호출
   *    - localStorage 업데이트 (재확인)
   *    - 전역 인증 상태 업데이트 (isLoggedIn, user)
   *    - redirect 쿼리스트링이 있으면 해당 경로로, 없으면 /boards로 이동
   * 5. 에러 발생 시 비밀번호 필드에 에러 메시지 표시
   *
   * @param data - 폼 데이터 (email, password)
   */
  const onSubmit = async (data: ILoginFormData) => {
    try {
      // 1. 로그인 API 호출
      const loginResult = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const accessToken = loginResult.data?.loginUser.accessToken;

      if (!accessToken) {
        setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호를 확인해 주세요.",
        });
        return;
      }

      // 2. localStorage에 accessToken 먼저 저장 (ApolloClient가 사용할 수 있도록)
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }

      // 3. 회원 조회 API 호출
      const userResult = await fetchUserLoggedIn();

      const user = userResult.data?.fetchUserLoggedIn;

      if (!user) {
        setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호를 확인해 주세요.",
        });
        return;
      }

      // 4. AuthProvider의 login 메서드 호출
      //    (localStorage 업데이트 + 전역 상태 업데이트 + 페이지 이동)
      const redirectPath = searchParams.get("redirect") || undefined;
      login(accessToken, user, redirectPath);
    } catch (err) {
      // 에러 처리
      console.error("Login Error:", err);
      setError("password", {
        type: "manual",
        message: "아이디 또는 비밀번호를 확인해 주세요.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    error,
  };
}
