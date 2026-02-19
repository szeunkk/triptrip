"use client";

import { Button, Inputfield } from "@commons/ui";
import styles from "./styles.module.css";
import useLoginForm from "./hook";
import classNames from "classnames";
import Image from "next/image";

export default function Login() {
  const { register, handleSubmit, formState, onClickLogin, onClickSignup } = useLoginForm();
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onClickLogin)}>
      <>
        <Image
          src="/icons/triptrip_logo.svg"
          alt="트립트립 로고"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.formContainer_logo}
        ></Image>
        <span>트립트립에 오신걸 환영합니다.</span>
      </>
      <div>
        <p>트립트립에 로그인 하세요.</p>
        <div
          className={classNames(styles.inputContainer, {
            [styles.error]: formState.isSubmitted && !formState.isValid,
          })}
        >
          <Inputfield type="text" placeholder="이메일을 입력해 주세요." {...register("email")} />
          <Inputfield type="password" placeholder="비밀번호를 입력해 주세요." {...register("password")} />
          {formState.isSubmitted && formState.errors.email && <span>{formState.errors.email.message}</span>}
        </div>
      </div>
      <>
        <Button variant="FormBtn" type="submit">
          로그인
        </Button>
        <p className={styles.SignupBtn} onClick={onClickSignup}>
          회원가입
        </p>
      </>
    </form>
  );
}
