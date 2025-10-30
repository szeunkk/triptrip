"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { useLoginForm } from "./hooks/index.form.hook";
import { url } from "@/commons/constants/url";
import styles from "./styles.module.css";

/**
 * Login Component
 * 로그인 섹션 컴포넌트입니다.
 * 로고, 환영 메시지, 로그인 폼, 로그인 버튼, 회원가입 링크로 구성됩니다.
 */
export function Login() {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="login-form"
          noValidate
        >
          {/* Top Section (Logo + Welcome) */}
          <div className={styles.topSection}>
            {/* Logo Area */}
            <div className={styles.logoArea}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/icons/logo.svg"
                  alt="트립트립 로고"
                  width={120}
                  height={80}
                  priority
                />
              </div>
              <div className={styles.welcomeText}>
                트립트립에 오신걸 환영합니다.
              </div>
            </div>

            {/* Login Form Section */}
            <div className={styles.loginFormSection}>
              <div className={styles.loginFormTitle}>
                트립트립에 로그인 하세요.
              </div>
              <div className={styles.inputArea}>
                <Input
                  {...register("email")}
                  placeholder="이메일을 입력해 주세요."
                  className={styles.inputWidth}
                  size="small"
                  variant="outlined"
                  data-testid="login-email-input"
                  error={errors.email?.message}
                />
                <div className={styles.inputWrapper}>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    className={styles.inputWidth}
                    size="small"
                    variant="outlined"
                    data-testid="login-password-input"
                    error={errors.password?.message}
                  />
                  {errors.password && (
                    <div
                      className={styles.additionalErrorMessage}
                      data-testid="login-password-error"
                    >
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className={styles.buttonSection}>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              shape="rectangle"
              className={styles.loginButton}
              disabled={loading}
              data-testid="login-submit-button"
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>
            <Link href={url.auth.signup.path} className={styles.signupText}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
