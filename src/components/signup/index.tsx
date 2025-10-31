"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { MessageModal } from "@/commons/components/message-modal";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { useSignupForm } from "./hooks/index.form.hook";
import { url } from "@/commons/constants/url";
import styles from "./styles.module.css";

/**
 * Signup Component
 * 회원가입 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, InputGroup, Gap, Button 영역으로 구성됩니다.
 */
export function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, formState, onSubmit, data, loading, error } =
    useSignupForm();
  const { openModal } = useModal();

  // 회원가입 성공 시 모달 표시
  useEffect(() => {
    if (data?.createUser?._id) {
      // 쿼리 파라미터 확인 및 로그인 경로 생성
      const query = searchParams.toString();
      const loginPath = query
        ? `${url.auth.login.path}?${query}`
        : url.auth.login.path;

      openModal(
        <MessageModal
          title="회원가입을 축하 드려요."
          buttonText="로그인 하기"
          onButtonClick={() => router.push(loginPath)}
          testId="signup-success-modal"
        />
      );
    }
  }, [data, openModal, router, searchParams]);

  // 모든 필드가 유효한지 확인
  const isFormValid = formState.isValid && !loading;

  return (
    <div className={styles.signup} data-testid="signup-page">
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
          <form
            className={styles.inputsContainer}
            onSubmit={handleSubmit(onSubmit)}
            data-testid="signup-form"
          >
            <Input
              variant="outlined"
              size="small"
              label="이메일"
              placeholder="이메일을 입력해 주세요."
              required
              className={styles.inputField}
              error={formState.errors.email?.message}
              data-testid="email-input"
              {...register("email")}
            />
            <Input
              variant="outlined"
              size="small"
              label="이름"
              placeholder="이름을 입력해 주세요."
              required
              className={styles.inputField}
              error={formState.errors.name?.message}
              data-testid="name-input"
              {...register("name")}
            />
            <Input
              variant="outlined"
              size="small"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              required
              className={styles.inputField}
              error={formState.errors.password?.message}
              data-testid="password-input"
              {...register("password")}
            />
            <Input
              variant="outlined"
              size="small"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              required
              className={styles.inputField}
              error={formState.errors.passwordConfirm?.message}
              data-testid="password-confirm-input"
              {...register("passwordConfirm")}
            />

            {/* API 에러 메시지 */}
            {error &&
              !formState.errors.email &&
              !formState.errors.name &&
              !formState.errors.password &&
              !formState.errors.passwordConfirm && (
                <div className={styles.errorMessage} data-testid="api-error">
                  {error}
                </div>
              )}
          </form>
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
            disabled={!isFormValid}
            onClick={handleSubmit(onSubmit)}
            data-testid="signup-button"
          >
            {loading ? "처리중..." : "회원가입"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
