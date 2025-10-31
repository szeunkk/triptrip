"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/commons/components/button";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { url } from "@/commons/constants/url";
import styles from "./signup-success-modal.module.css";

/**
 * SignupSuccessModal Component
 * 회원가입 성공 시 표시되는 모달 컴포넌트입니다.
 * 회원가입 완료 메시지와 로그인 페이지 이동 버튼을 제공합니다.
 *
 * 주요 기능:
 * 1. 회원가입 성공 메시지 표시
 * 2. 로그인 페이지로 이동
 * 3. 쿼리 파라미터 유지 (redirect 등)
 */
export function SignupSuccessModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeModal } = useModal();

  // ========================================
  // Ready Flag (이미지 로드 완료)
  // ========================================

  const [ready, setReady] = useState(false);

  /**
   * 로그인하기 버튼 클릭 핸들러
   * 모달을 닫고 로그인 페이지로 이동합니다.
   * 쿼리 파라미터가 있을 경우 함께 전달합니다.
   */
  const handleLoginClick = () => {
    // 1. 모달 닫기
    closeModal();

    // 2. 쿼리 파라미터 확인 및 로그인 경로 생성
    const query = searchParams.toString();
    const loginPath = query
      ? `${url.auth.login.path}?${query}`
      : url.auth.login.path;

    // 3. 로그인 페이지로 이동
    router.push(loginPath);
  };

  return (
    <div className={styles.backdrop} data-testid="signup-success-modal">
      <div
        className={styles.popup}
        data-ready={ready}
        data-testid="signup-success-popup"
      >
        {/* 로고 및 타이틀 영역 */}
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={77.28}
              height={48}
              priority
              onLoadingComplete={() => setReady(true)}
            />
          </div>
          <div className={styles.title}>회원가입을 축하 드려요.</div>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.buttonArea}>
          <Button
            variant="primary"
            size="small"
            shape="rectangle"
            className={styles.loginButton}
            onClick={handleLoginClick}
            data-testid="login-button"
          >
            로그인 하기
          </Button>
        </div>
      </div>
    </div>
  );
}
