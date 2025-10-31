"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { url } from "@/commons/constants/url";

// 사용자 정보 타입
export interface IUser {
  _id: string;
  name: string;
}

// Auth Context 타입 정의
interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (accessToken: string, user: IUser, redirect?: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

// Context 생성
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Provider Props 타입
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider
 * 로그인 상태와 사용자 정보를 전역으로 관리합니다.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  /**
   * 로그인 상태 검증
   * localStorage의 accessToken 및 user 정보를 확인하여 상태를 업데이트합니다.
   */
  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return;

    // 테스트 환경일 경우 기본 로그인 상태로 설정
    if (process.env.NEXT_PUBLIC_TEST_ENV === "test") {
      setIsLoggedIn(true);
      setUser({
        _id: "test-user-id",
        name: "테스트 사용자",
      });
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const userString = localStorage.getItem("user");

      if (accessToken && userString) {
        const parsedUser = JSON.parse(userString);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  /**
   * 로그인 처리
   *
   * @param accessToken - 액세스 토큰
   * @param user - 사용자 정보
   * @param redirect - 로그인 후 이동할 경로 (optional)
   */
  const login = useCallback(
    (accessToken: string, user: IUser, redirect?: string) => {
      if (typeof window === "undefined") return;

      try {
        // localStorage에 토큰과 사용자 정보 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // 상태 업데이트
        setIsLoggedIn(true);
        setUser(user);

        // redirect 파라미터 또는 기본 경로로 이동
        const redirectPath = redirect || url.boards.list.path;
        router.replace(redirectPath);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [router]
  );

  /**
   * 로그아웃 처리
   * localStorage를 정리하고 로그인 페이지로 이동합니다.
   */
  const logout = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      // localStorage 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // 상태 업데이트
      setIsLoggedIn(false);
      setUser(null);

      // 로그인 페이지로 이동
      router.push(url.auth.login.path);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [router]);

  /**
   * 초기화: 컴포넌트 마운트 시 한 번만 로그인 상태 확인
   */
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: IAuthContext = {
    isLoggedIn,
    user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Auth context를 사용하기 위한 커스텀 훅
 */
export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
