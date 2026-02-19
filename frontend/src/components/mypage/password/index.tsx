"use client";

import { useState } from "react";
import { Inputfield, Button } from "@commons/ui";
import styles from "./styles.module.css";

export default function MypagePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordMatch = newPassword !== "" && newPassword === confirmPassword;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <Inputfield
            label="새 비밀번호"
            required
            type="password"
            placeholder="새 비밀번호를 입력해 주세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Inputfield
            label="새 비밀번호 확인"
            required
            type="password"
            placeholder="새 비밀번호를 확인해 주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="FormBtn" type="submit" disabled={!isPasswordMatch}>
            비밀번호 변경
          </Button>
        </div>
      </div>
    </div>
  );
}
