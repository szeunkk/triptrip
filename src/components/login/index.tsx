"use client";

import React from "react";
import styles from "./styles.module.css";

/**
 * Login Component
 * 로그인 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Logo, Gap, InputGroup, Gap, ButtonGroup 영역으로 구성됩니다.
 */
export function Login() {
  return (
    <div className={styles.container}>
      {/* Logo Section */}
      <div className={styles.logo}>logo</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* InputGroup Section */}
      <div className={styles.inputGroup}>inputgroup</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* ButtonGroup Section */}
      <div className={styles.buttonGroup}>buttongroup</div>
    </div>
  );
}

export default Login;
