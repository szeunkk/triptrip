"use client";

import React from "react";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

/**
 * Signup Component
 * 회원가입 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, InputGroup, Gap, Button 영역으로 구성됩니다.
 */
export function Signup() {
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.title}>회원가입</div>

        {/* Gap */}
        <div className={styles.gap}></div>

        {/* InputGroup Section */}
        <div className={styles.inputGroup}>
          {/* Subtitle */}
          <div className={styles.subtitle}>
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </div>

          {/* Inputs Container */}
          <div className={styles.inputsContainer}>
            <Input
              variant="outlined"
              size="small"
              label="이메일"
              placeholder="이메일을 입력해 주세요."
              required
              className={styles.inputField}
            />
            <Input
              variant="outlined"
              size="small"
              label="이름"
              placeholder="이름을 입력해 주세요."
              required
              className={styles.inputField}
            />
            <Input
              variant="outlined"
              size="small"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              required
              className={styles.inputField}
            />
            <Input
              variant="outlined"
              size="small"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              required
              className={styles.inputField}
            />
          </div>
        </div>

        {/* Gap */}
        <div className={styles.gap}></div>

        {/* Button Section */}
        <div className={styles.buttonWrapper}>
          <Button
            variant="primary"
            size="medium"
            shape="rectangle"
            className={styles.submitButton}
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
