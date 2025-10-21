import React from "react";
import styles from "./styles.module.css";

/**
 * Boards Component
 * 게시판 페이지의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Search, List 영역으로 구성됩니다.
 */
export function Boards() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>title</div>
      <div className={styles.gap}></div>
      <div className={styles.search}>search</div>
      <div className={styles.gap}></div>
      <div className={styles.list}>list</div>
    </div>
  );
}

export default Boards;
