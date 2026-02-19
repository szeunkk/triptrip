"use client";

import { Button, Inputfield } from "@commons/ui";
import styles from "./styles.module.css";
import { Modal } from "antd";
import useSignupForm from "./hook";
import classNames from "classnames";
import Image from "next/image";

export default function Signup() {
  const { register, handleSubmit, formState, isModalOpen, onClickSignup, onClickLogin } = useSignupForm();
  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onClickSignup)}>
        <span className={styles.title}>회원가입</span>
        <div>
          회원가입을 위해 아래 빈칸을 모두 채워 주세요
          <div className={styles.inputContainer}>
            <div className={classNames({ [styles.error]: formState.isSubmitted && formState.errors.email })}>
              <Inputfield
                type="text"
                placeholder="이메일을 입력해 주세요."
                label="이메일"
                required
                {...register("email")}
              />
              {formState.isSubmitted && formState.errors.email && (
                <span className={styles.errorMessage}>{formState.errors.email.message}</span>
              )}
            </div>
            <div className={classNames({ [styles.error]: formState.isSubmitted && formState.errors.name })}>
              <Inputfield
                type="text"
                placeholder="이름을 입력해 주세요."
                label="이름"
                required
                {...register("name")}
              />
              {formState.isSubmitted && formState.errors.name && (
                <span className={styles.errorMessage}>{formState.errors.name.message}</span>
              )}
            </div>
            <div
              className={classNames({ [styles.error]: formState.isSubmitted && formState.errors.password })}
            >
              <Inputfield
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                label="비밀번호"
                required
                {...register("password")}
              />
              {formState.isSubmitted && formState.errors.password && (
                <span className={styles.errorMessage}>{formState.errors.password.message}</span>
              )}
            </div>
            <div
              className={classNames({
                [styles.error]: formState.isSubmitted && formState.errors.passwordConfirm,
              })}
            >
              <Inputfield
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                label="비밀번호 확인"
                required
                {...register("passwordConfirm")}
              />
              {formState.isSubmitted && formState.errors.passwordConfirm && (
                <span className={styles.errorMessage}>{formState.errors.passwordConfirm.message}</span>
              )}
            </div>
          </div>
        </div>
        <>
          <Button variant="FormBtn" type="submit">
            회원가입
          </Button>
        </>
      </form>
      <Modal
        open={isModalOpen}
        centered
        onOk={() => {}}
        onCancel={() => {}}
        closeIcon={null}
        classNames={{ content: styles.modal, footer: styles.modalBtn }}
        footer={
          <Button variant="modalBtn" type="submit" onClick={onClickLogin}>
            로그인하기
          </Button>
        }
      >
        <div>회원가입을 축하드려요.</div>
        <div>
          {/* <img src="/icons/triptrip_logo.svg" /> */}
          <Image
            src="/icons/triptrip_logo.svg"
            alt="트립트립 로고"
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "3rem", width: "100%" }}
          ></Image>
        </div>
      </Modal>
    </>
  );
}
