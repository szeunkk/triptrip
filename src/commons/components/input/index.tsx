"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

// Input Props 타입
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
  state?: "default" | "error" | "focused" | "filled" | "read-only";
  label?: string;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
  "data-testid"?: string;
}

/**
 * Input Component
 * 다양한 variant, size, state를 지원하는 재사용 가능한 입력 컴포넌트입니다.
 *
 * @param variant - 입력 필드 스타일: 'filled' | 'outlined'
 * @param size - 입력 필드 크기: 'small' | 'medium'
 * @param state - 입력 필드 상태: 'default' | 'error' | 'focused' | 'filled' | 'read-only'
 * @param label - 레이블 텍스트
 * @param required - 필수 입력 필드 여부
 * @param error - 에러 메시지
 * @param readOnly - 읽기 전용 상태
 * @param disabled - 비활성화 상태
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      state: propState,
      label,
      required = false,
      error,
      readOnly = false,
      disabled = false,
      className,
      value,
      placeholder = "내용을 입력해 주세요.",
      ...rest
    },
    ref
  ) => {
    // state 결정 로직
    const getState = () => {
      if (propState) return propState;
      if (disabled) return "disabled";
      if (readOnly) return "readOnly";
      if (error) return "error";
      if (value && String(value).length > 0) return "filled";
      return "default";
    };

    const state = getState();

    // data-testid 추출 (에러 메시지용)
    const dataTestId = rest["data-testid"];
    const errorTestId = dataTestId ? `${dataTestId}-error` : undefined;

    const containerClasses = [
      styles.container,
      styles[`size_${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      styles[`variant_${variant}`],
      styles[`size_${size}`],
      styles[`state_${state}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {/* 레이블 영역 */}
        {label && (
          <div className={styles.labelWrapper}>
            <label className={styles.label}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          </div>
        )}

        {/* 인풋 영역 */}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={inputClasses}
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            {...rest}
          />
        </div>

        {/* 에러 메시지 영역 */}
        {error && (
          <div className={styles.errorMessage} data-testid={errorTestId}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
