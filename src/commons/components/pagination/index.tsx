"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

// Pagination Props 타입
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: "small" | "medium";
  state?: "default" | "hover" | "active";
  showNavigationArrows?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * Pagination Component
 * 페이지네이션을 위한 재사용 가능한 컴포넌트입니다.
 *
 * @param currentPage - 현재 페이지 번호 (1부터 시작)
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 핸들러
 * @param size - 페이지네이션 크기: 'small' | 'medium'
 * @param state - 상태: 'default' | 'hover' | 'active'
 * @param showNavigationArrows - 좌우 화살표 표시 여부
 * @param maxVisiblePages - 최대 표시할 페이지 수
 * @param className - 추가 CSS 클래스명
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = "medium",
  state = "default",
  showNavigationArrows = true,
  maxVisiblePages = 5,
  className,
}: PaginationProps) {
  // 페이지 번호들을 계산하는 함수
  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 특정 페이지로 이동
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // 컨테이너 클래스명
  const paginationClasses = [
    styles.pagination,
    styles[`size_${size}`],
    styles[`state_${state}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 페이지가 1개만 있는 경우
  if (totalPages <= 1) {
    return (
      <div className={paginationClasses}>
        <div className={styles.pagesContainer}>
          <button
            className={`${styles.pageButton} ${styles.active}`}
            onClick={() => handlePageClick(1)}
            disabled
          >
            1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={paginationClasses}>
      {/* 좌측 네비게이션 화살표 */}
      {showNavigationArrows && (
        <button
          className={`${styles.navigationButton} ${
            !canGoPrevious ? styles.disabled : ""
          }`}
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          aria-label="이전 페이지"
        >
          <Image
            src={`/icons/${
              canGoPrevious
                ? "leftenable_outline_light_m"
                : "leftdisabled_outline_light_m"
            }.svg`}
            alt="이전"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 페이지 번호들 */}
      <div className={styles.pagesContainer}>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 우측 네비게이션 화살표 */}
      {showNavigationArrows && (
        <button
          className={`${styles.navigationButton} ${
            !canGoNext ? styles.disabled : ""
          }`}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="다음 페이지"
        >
          <Image
            src={`/icons/${
              canGoNext
                ? "rightenable_outline_light_m"
                : "rightdisabled_outline_light_m"
            }.svg`}
            alt="다음"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}

export default Pagination;
