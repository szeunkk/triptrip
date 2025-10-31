"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import { useModal } from "@/commons/providers/modal/modal.provider";
import styles from "./styles.module.css";

/**
 * MessageModal Props
 */
export interface MessageModalProps {
  /** 타이틀 텍스트 */
  title: string;

  /** 로고 표시 여부 (default: true) */
  showLogo?: boolean;

  /** 로고 이미지 경로 (default: "/icons/logo.svg") */
  logoSrc?: string;

  /** 로고 너비 (default: 77.28) */
  logoWidth?: number;

  /** 로고 높이 (default: 48) */
  logoHeight?: number;

  /** 버튼 텍스트 */
  buttonText: string;

  /** 버튼 클릭 핸들러 */
  onButtonClick: () => void;

  /** 버튼 variant (default: "primary") */
  buttonVariant?: "primary" | "secondary" | "tertiary";

  /** 버튼 size (default: "small") */
  buttonSize?: "small" | "medium" | "large";

  /** 버튼 shape (default: "rectangle") */
  buttonShape?: "rectangle" | "rounded" | "circle";

  /** 버튼 커스텀 클래스 */
  buttonClassName?: string;

  /** 테스트 ID */
  testId?: string;
}

/**
 * MessageModal Component
 * 공통으로 사용할 수 있는 메시지 모달 컴포넌트입니다.
 * 로고, 타이틀, 버튼으로 구성되며 props를 통해 커스터마이징할 수 있습니다.
 *
 * 주요 기능:
 * 1. 메시지 표시
 * 2. 선택적 로고 표시
 * 3. 버튼 액션 처리
 */
export function MessageModal({
  title,
  showLogo = true,
  logoSrc = "/icons/logo.svg",
  logoWidth = 77.28,
  logoHeight = 48,
  buttonText,
  onButtonClick,
  buttonVariant = "primary",
  buttonSize = "small",
  buttonShape = "rectangle",
  buttonClassName,
  testId = "message-modal",
}: MessageModalProps) {
  const { closeModal } = useModal();

  // ========================================
  // Ready Flag (이미지 로드 완료)
  // ========================================

  const [ready, setReady] = useState(!showLogo); // 로고가 없으면 즉시 ready

  /**
   * 버튼 클릭 핸들러
   * 모달을 닫고 전달받은 콜백을 실행합니다.
   */
  const handleButtonClick = () => {
    closeModal();
    onButtonClick();
  };

  return (
    <div className={styles.backdrop} data-testid={testId}>
      <div
        className={styles.popup}
        data-ready={ready}
        data-testid={`${testId}-popup`}
      >
        {/* 로고 및 타이틀 영역 */}
        <div className={styles.content}>
          {showLogo && (
            <div className={styles.logoWrapper}>
              <Image
                src={logoSrc}
                alt="logo"
                width={logoWidth}
                height={logoHeight}
                priority
                onLoadingComplete={() => setReady(true)}
              />
            </div>
          )}
          <div className={styles.title}>{title}</div>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.buttonArea}>
          <Button
            variant={buttonVariant}
            size={buttonSize}
            shape={buttonShape}
            className={buttonClassName || styles.button}
            onClick={handleButtonClick}
            data-testid={`${testId}-button`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
