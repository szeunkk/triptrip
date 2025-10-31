"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { isAuthRequired, url } from "@/commons/constants/url";
import { Button } from "@/commons/components/button";
import styles from "./auth.guard.module.css";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Auth Guard
 * 페이지 접근 권한을 검증하고, 권한이 없는 경우 로그인 유도 모달을 표시합니다.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal, isOpen } = useModal();

  // AuthProvider 초기화 상태 추적
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  // 페이지 접근 허용 상태
  const [isAccessAllowed, setIsAccessAllowed] = useState(false);
  // 모달 표시 여부 추적 (한 번만 표시하기 위함)
  const hasShownModal = useRef(false);
  // 모달이 열렸던 상태를 추적
  const wasModalOpen = useRef(false);

  /**
   * 로그인 페이지로 이동
   * 현재 pathname을 redirect 파라미터로 포함하여 로그인 후 원래 페이지로 돌아올 수 있도록 함
   */
  const handleLoginRedirect = useCallback(() => {
    wasModalOpen.current = false;
    hasShownModal.current = false;
    closeModal();
    // 현재 pathname을 redirect 파라미터로 추가
    const loginUrl = `${url.auth.login.path}?redirect=${encodeURIComponent(
      pathname
    )}`;
    router.push(loginUrl);
  }, [closeModal, router, pathname]);

  /**
   * 이전 페이지로 이동
   */
  const handleGoBack = useCallback(() => {
    wasModalOpen.current = false;
    hasShownModal.current = false;
    closeModal();
    router.back();
  }, [closeModal, router]);

  /**
   * 로그인 유도 모달 표시
   */
  const showLoginModal = useCallback(() => {
    if (hasShownModal.current) return;
    hasShownModal.current = true;

    openModal(
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>로그인이 필요한 서비스입니다.</h2>
        <div className={styles.modalButtons}>
          <Button variant="tertiary" onClick={handleGoBack}>
            취소
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            로그인하기
          </Button>
        </div>
      </div>
    );
  }, [openModal, handleGoBack, handleLoginRedirect]);

  /**
   * AuthProvider 초기화 대기
   * - 클라이언트 사이드 렌더링 후 AuthProvider가 초기화될 때까지 대기
   */
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    // 테스트 환경: 즉시 초기화 완료로 간주
    if (process.env.NEXT_PUBLIC_TEST_ENV === "test") {
      setIsAuthInitialized(true);
      setIsAccessAllowed(true);
      return;
    }

    // 짧은 지연 후 초기화 완료로 간주 (AuthProvider useEffect 실행 대기)
    const timer = setTimeout(() => {
      setIsAuthInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /**
   * 페이지 접근 권한 검증
   * - 경로가 변경되거나 로그인 상태가 변경될 때마다 실행
   */
  useEffect(() => {
    // AuthProvider 초기화가 완료되지 않았으면 대기
    if (!isAuthInitialized) return;

    // 테스트 환경: 모든 페이지 접근 허용
    if (process.env.NEXT_PUBLIC_IS_TEST === "true") {
      setIsAccessAllowed(true);
      return;
    }

    // 현재 경로가 권한 검증이 필요한지 확인
    const needsAuth = isAuthRequired(pathname);

    // 권한이 필요하지 않은 페이지: 접근 허용
    if (!needsAuth) {
      setIsAccessAllowed(true);
      hasShownModal.current = false; // 모달 상태 초기화
      return;
    }

    // 권한이 필요한 페이지인데 로그인이 되어 있지 않음: 접근 거부
    if (needsAuth && !isLoggedIn) {
      setIsAccessAllowed(false);
      showLoginModal();
      return;
    }

    // 권한이 필요한 페이지이고 로그인도 되어 있음: 접근 허용
    if (needsAuth && isLoggedIn) {
      setIsAccessAllowed(true);
      hasShownModal.current = false; // 모달 상태 초기화
      return;
    }
  }, [isAuthInitialized, pathname, isLoggedIn, showLoginModal]);

  /**
   * 경로가 변경될 때마다 모달 상태 초기화
   */
  useEffect(() => {
    hasShownModal.current = false;
    wasModalOpen.current = false;
  }, [pathname]);

  /**
   * 모달이 의도치 않게 닫힌 경우 처리
   * (ESC 키나 Overlay 클릭으로 닫힌 경우 이전 페이지로 이동)
   */
  useEffect(() => {
    // 모달이 열려있는 상태를 추적
    if (isOpen && !isAccessAllowed) {
      wasModalOpen.current = true;
    }

    // 모달이 열려있다가 닫힌 경우 (버튼 클릭 외의 방법으로 닫힌 경우)
    if (!isOpen && wasModalOpen.current && !isAccessAllowed) {
      wasModalOpen.current = false;
      hasShownModal.current = false;
      // 이전 페이지로 이동
      router.back();
    }
  }, [isOpen, isAccessAllowed, router]);

  // AuthProvider 초기화 대기 중이거나 접근이 허용되지 않은 경우: 빈 화면 표시
  if (!isAuthInitialized || !isAccessAllowed) {
    return <div className={styles.loadingScreen} />;
  }

  // 접근 허용: children 렌더링
  return <>{children}</>;
}
