"use client";

import styles from "./styles.module.css";
import useLoginForm from "./hook";

export default function Login() {
  const { register, handleSubmit, onClickLogin, onClickSignup } = useLoginForm();

  return (
    <form className={styles.container} onSubmit={handleSubmit(onClickLogin)}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
            <span className={styles.logoText}>R</span>
          </div>
          <span className={styles.brandText}>Re:fit</span>
        </div>
        <p className={styles.subtitle}>중고 패션의 새로운 기준</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>로그인</h2>
          <p className={styles.cardDescription}>Re:fit에 오신 것을 환영합니다</p>
        </div>

        <div className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>이메일</label>
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
                className={styles.input}
                placeholder="example@email.com"
                data-testid="email-input"
                {...register("email")}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>비밀번호</label>
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
                className={styles.input}
                placeholder="••••••••"
                data-testid="password-input"
                {...register("password")}
              />
            </div>
          </div>

          <div className={styles.options}>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="keepLogin"
                className={styles.checkbox}
                data-testid="keep-login-checkbox"
              />
              <label htmlFor="keepLogin" className={styles.checkboxLabel}>
                로그인 상태 유지
              </label>
            </div>
            <button className={styles.linkButton} data-testid="forgot-password-link">
              비밀번호 찾기
            </button>
          </div>

          <button className={styles.loginButton} data-testid="login-button">
            로그인
          </button>

          <div className={styles.footer}>
            <span className={styles.footerText}>계정이 없으신가요?</span>
            <button className={styles.signupButton} data-testid="signup-link" onClick={onClickSignup}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}



