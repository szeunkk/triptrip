"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

// DatePicker Props 타입
export interface DatePickerProps {
  size?: "small" | "medium";
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  className?: string;
}

/**
 * DatePicker Component
 * 기간 선택을 지원하는 재사용 가능한 날짜 선택 컴포넌트입니다.
 *
 * @param size - 컴포넌트 크기: 'small' | 'medium'
 * @param startDate - 시작 날짜 (YYYY-MM-DD 형식)
 * @param endDate - 종료 날짜 (YYYY-MM-DD 형식)
 * @param onStartDateChange - 시작 날짜 변경 핸들러
 * @param onEndDateChange - 종료 날짜 변경 핸들러
 * @param className - 추가 CSS 클래스명
 */
export function DatePicker({
  size = "medium",
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
  className,
}: DatePickerProps) {
  const [internalStartDate, setInternalStartDate] = useState(startDate);
  const [internalEndDate, setInternalEndDate] = useState(endDate);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  // 시작 날짜 변경 핸들러
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalStartDate(value);
    onStartDateChange?.(value);
  };

  // 종료 날짜 변경 핸들러
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalEndDate(value);
    onEndDateChange?.(value);
  };

  // 날짜 포맷 변환 함수 (YYYY-MM-DD → YYYY.MM.DD)
  const formatDate = (date: string) => {
    if (!date) return "YYYY.MM.DD";
    const [year, month, day] = date.split("-");
    return `${year}.${month}.${day}`;
  };

  // 시작 날짜 피커 열기
  const handleStartClick = () => {
    startInputRef.current?.showPicker();
  };

  // 종료 날짜 피커 열기
  const handleEndClick = () => {
    endInputRef.current?.showPicker();
  };

  // 컨테이너 클래스명
  const datepickerClasses = [
    styles.datepicker,
    styles[`size_${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={datepickerClasses}>
      <div className={styles.iconWrapper}>
        <Image
          src="/icons/calendar.svg"
          alt="calendar"
          width={24}
          height={24}
        />
      </div>

      <div className={styles.dateWrapper}>
        {/* 시작 날짜 */}
        <div className={styles.dateGroup}>
          <div className={styles.dateDisplay} onClick={handleStartClick}>
            {formatDate(internalStartDate)}
          </div>
          <input
            ref={startInputRef}
            type="date"
            className={styles.dateInput}
            value={internalStartDate}
            onChange={handleStartDateChange}
            aria-label="시작 날짜"
          />
        </div>

        {/* 구분자 */}
        <div className={styles.separator}>-</div>

        {/* 종료 날짜 */}
        <div className={styles.dateGroup}>
          <div className={styles.dateDisplay} onClick={handleEndClick}>
            {formatDate(internalEndDate)}
          </div>
          <input
            ref={endInputRef}
            type="date"
            className={styles.dateInput}
            value={internalEndDate}
            onChange={handleEndDateChange}
            min={internalStartDate}
            aria-label="종료 날짜"
          />
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
