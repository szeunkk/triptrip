"use client";

import React from "react";
import styles from "./styles.module.css";

/**
 * Signup Component
 * 회원가입 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, InputGroup, Gap, Button 영역으로 구성됩니다.
 */
export function Signup() {
  return (
    <div className={styles.container}>
      {/* Title Section */}
      <div className={styles.title}>회원가입 제목</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* InputGroup Section */}
      <div className={styles.inputGroup}>입력 영역</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Button Section */}
      <div className={styles.button}>버튼 영역</div>
    </div>
  );
}

export default Signup;
