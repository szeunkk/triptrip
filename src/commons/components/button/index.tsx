"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

// Button Props 타입
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "small" | "medium";
  shape?: "rectangle" | "pill";
  children?: React.ReactNode;
}

/**
 * Button Component
 * 다양한 variant, size, shape를 지원하는 재사용 가능한 버튼 컴포넌트입니다.
 *
 * @param variant - 버튼 스타일: 'primary' | 'secondary' | 'tertiary' | 'ghost'
 * @param size - 버튼 크기: 'small' | 'medium'
 * @param shape - 버튼 모양: 'rectangle' | 'pill'
 * @param disabled - 비활성화 상태
 */
export function Button({
  variant = "primary",
  size = "medium",
  shape = "rectangle",
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    styles[`shape_${shape}`],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
