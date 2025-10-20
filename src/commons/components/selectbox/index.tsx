"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

// SelectBox Option 타입
export interface SelectOption {
  value: string | number;
  label: string;
}

// SelectBox Props 타입
export interface SelectBoxProps {
  open?: boolean;
  state?: "default" | "hover" | "active";
  size?: "small" | "medium";
  value?: string | number;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string | number) => void;
  onToggle?: (open: boolean) => void;
}

/**
 * SelectBox Component
 * 드롭다운 형태의 선택 컴포넌트입니다.
 *
 * @param open - 드롭다운 열림/닫힘 상태: true | false
 * @param state - 인터랙션 상태: 'default' | 'hover' | 'active'
 * @param size - 컴포넌트 크기: 'small' | 'medium'
 * @param value - 선택된 값
 * @param placeholder - 플레이스홀더 텍스트
 * @param options - 선택 가능한 옵션 배열
 * @param disabled - 비활성화 상태
 * @param onSelect - 옵션 선택 시 콜백
 * @param onToggle - 드롭다운 토글 시 콜백
 */
export const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>(
  (
    {
      open: controlledOpen,
      state = "default",
      size = "medium",
      value,
      placeholder = "내용입력",
      options = [],
      disabled = false,
      className,
      onSelect,
      onToggle,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string | number | null>(
      null
    );
    const selectboxRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // controlled vs uncontrolled open state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // 선택된 옵션 찾기
    const selectedOption = options.find((option) => option.value === value);
    const hasValue = selectedOption !== undefined;

    // 드롭다운 토글
    const handleToggle = () => {
      if (disabled) return;

      const newOpen = !isOpen;
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onToggle?.(newOpen);
    };

    // 옵션 선택
    const handleOptionSelect = (optionValue: string | number) => {
      onSelect?.(optionValue);

      // 선택 후 드롭다운 닫기
      if (controlledOpen === undefined) {
        setInternalOpen(false);
      }
      onToggle?.(false);
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectboxRef.current &&
          !selectboxRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          if (controlledOpen === undefined) {
            setInternalOpen(false);
          }
          onToggle?.(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, controlledOpen, onToggle]);

    // CSS 클래스명 생성
    const selectboxClasses = [
      styles.selectbox,
      styles[`size_${size}`],
      styles[`state_${state}`],
      hasValue && styles.filled,
      isOpen && styles.selected,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const dropdownClasses = [styles.dropdown, isOpen && styles.open]
      .filter(Boolean)
      .join(" ");

    const containerClasses = [styles.container, styles[`size_${size}`]]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses} ref={ref}>
        {/* 셀렉트박스 */}
        <div
          ref={selectboxRef}
          className={selectboxClasses}
          onClick={handleToggle}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <div className={styles.content}>
            <span className={styles.text}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className={styles.icon}>
              <Image
                src={`/icons/${isOpen ? "up_arrow" : "down_arrow"}.svg`}
                alt={isOpen ? "접기" : "펼치기"}
                width={size === "small" ? 20 : 24}
                height={size === "small" ? 20 : 24}
              />
            </div>
          </div>
        </div>

        {/* 드롭다운 */}
        {isOpen && (
          <div ref={dropdownRef} className={dropdownClasses}>
            <div className={styles.optionList} role="listbox">
              {options.map((option) => {
                const isSelected = option.value === value;
                const isHovered = option.value === hoveredOption;

                const optionClasses = [
                  styles.option,
                  isSelected && styles.optionSelected,
                  isHovered && styles.optionHovered,
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={option.value}
                    className={optionClasses}
                    onClick={() => handleOptionSelect(option.value)}
                    onMouseEnter={() => setHoveredOption(option.value)}
                    onMouseLeave={() => setHoveredOption(null)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className={styles.optionText}>{option.label}</span>
                    {isSelected && (
                      <div className={styles.checkIcon}>
                        <Image
                          src="/icons/check.svg"
                          alt="선택됨"
                          width={size === "small" ? 14 : 16}
                          height={size === "small" ? 14 : 16}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

SelectBox.displayName = "SelectBox";

export default SelectBox;
