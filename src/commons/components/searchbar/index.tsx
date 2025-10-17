"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

// SearchBar Props 타입
export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "selected" | "typing" | "filled";
  size?: "small" | "medium";
}

/**
 * SearchBar Component
 * 다양한 variant와 size를 지원하는 재사용 가능한 검색바 컴포넌트입니다.
 *
 * @param variant - 검색바 스타일: 'default' | 'selected' | 'typing' | 'filled'
 * @param size - 검색바 크기: 'small' | 'medium'
 * @param placeholder - 플레이스홀더 텍스트
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      variant = "default",
      size = "medium",
      placeholder = "제목을 검색해 주세요.",
      className,
      ...rest
    },
    ref
  ) => {
    const containerClasses = [
      styles.searchbar,
      styles[`variant_${variant}`],
      styles[`size_${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className={styles.icon}
        />
        <input
          ref={ref}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
