"use client";

import styles from "./styles.module.css";
import useSignupForm from "./hook";

export default function SignupPage() {
  const { register, handleSubmit, formState, isModalOpen, onClickSignup, onClickLogin } = useSignupForm();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
            <span className={styles.logoText}>R</span>
          </div>
          <span className={styles.brandName}>Re:fit</span>
        </div>
        <p className={styles.tagline}>중고 패션의 새로운 기준</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>회원가입</h1>
          <p className={styles.cardDescription}>Re:fit에 오신 것을 환영합니다</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onClickSignup)}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              이름
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0833 12.25V11.0833C11.0833 10.4645 10.8375 9.871 10.3999 9.43342C9.96232 8.99583 9.36883 8.75 8.74999 8.75H5.24999C4.63115 8.75 4.03766 8.99583 3.60007 9.43342C3.16249 9.871 2.91666 10.4645 2.91666 11.0833V12.25"
                    stroke="#23345C"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.99999 6.41667C8.28865 6.41667 9.33332 5.372 9.33332 4.08333C9.33332 2.79467 8.28865 1.75 6.99999 1.75C5.71133 1.75 4.66666 2.79467 4.66666 4.08333C4.66666 5.372 5.71133 6.41667 6.99999 6.41667Z"
                    stroke="#23345C"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="홍길동"
                {...register("name")}
              />
            </div>
            {formState.errors.name && (
              <span style={{ color: "red", fontSize: "12px" }}>{formState.errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8334 4.0835L7.5886 7.42425C7.41063 7.52762 7.20847 7.58207 7.00265 7.58207C6.79682 7.58207 6.59467 7.52762 6.41669 7.42425L1.16669 4.0835"
                    stroke="#23345C"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6667 2.3335H2.33335C1.68902 2.3335 1.16669 2.85583 1.16669 3.50016V10.5002C1.16669 11.1445 1.68902 11.6668 2.33335 11.6668H11.6667C12.311 11.6668 12.8334 11.1445 12.8334 10.5002V3.50016C12.8334 2.85583 12.311 2.3335 11.6667 2.3335Z"
                    stroke="#23345C"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="example@email.com"
                {...register("email")}
              />
            </div>
            {formState.errors.email && (
              <span style={{ color: "red", fontSize: "12px" }}>{formState.errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3_3189)">
                    <path
                      d="M11.0833 6.4165H2.91667C2.27233 6.4165 1.75 6.93884 1.75 7.58317V11.6665C1.75 12.3108 2.27233 12.8332 2.91667 12.8332H11.0833C11.7277 12.8332 12.25 12.3108 12.25 11.6665V7.58317C12.25 6.93884 11.7277 6.4165 11.0833 6.4165Z"
                      stroke="#23345C"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.08331 6.4165V4.08317C4.08331 3.30962 4.3906 2.56776 4.93758 2.02078C5.48457 1.47379 6.22643 1.1665 6.99998 1.1665C7.77353 1.1665 8.51539 1.47379 9.06237 2.02078C9.60936 2.56776 9.91665 3.30962 9.91665 4.08317V6.4165"
                      stroke="#23345C"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_3189">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
            {formState.errors.password && (
              <span style={{ color: "red", fontSize: "12px" }}>{formState.errors.password.message}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3_3189)">
                    <path
                      d="M11.0833 6.4165H2.91667C2.27233 6.4165 1.75 6.93884 1.75 7.58317V11.6665C1.75 12.3108 2.27233 12.8332 2.91667 12.8332H11.0833C11.7277 12.8332 12.25 12.3108 12.25 11.6665V7.58317C12.25 6.93884 11.7277 6.4165 11.0833 6.4165Z"
                      stroke="#23345C"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.08331 6.4165V4.08317C4.08331 3.30962 4.3906 2.56776 4.93758 2.02078C5.48457 1.47379 6.22643 1.1665 6.99998 1.1665C7.77353 1.1665 8.51539 1.47379 9.06237 2.02078C9.60936 2.56776 9.91665 3.30962 9.91665 4.08317V6.4165"
                      stroke="#23345C"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_3189">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                type="password"
                id="passwordConfirm"
                className={styles.input}
                placeholder="••••••••"
                {...register("passwordConfirm")}
              />
            </div>
            {formState.errors.passwordConfirm && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {formState.errors.passwordConfirm.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            회원가입
          </button>

          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <button type="button" className={styles.linkButton} onClick={onClickLogin}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
