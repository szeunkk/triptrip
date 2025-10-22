"use client";

import React from "react";
import styles from "./styles.module.css";

/**
 * BoardsBest Component
 * 게시판 베스트 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, Best 영역으로 구성됩니다.
 */
export function BoardsBest() {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.gap}></div>
      <div className={styles.best}></div>
    </div>
  );
}

export default BoardsBest;
