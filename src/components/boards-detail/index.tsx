"use client";

import React from "react";
import styles from "./styles.module.css";

/**
 * BoardsDetail Component
 * 게시판 상세보기 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Writer, Image, Content, Youtube, Like, Button 영역으로 구성됩니다.
 */
export function BoardsDetail() {
  return (
    <div className={styles.container}>
      {/* Detail Title Section */}
      <div className={styles.detailTitle}>detailTitle</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Writer Section */}
      <div className={styles.detailWriter}>detailWriter</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Image Section */}
      <div className={styles.detailImage}>detailImage</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Content Section */}
      <div className={styles.detailContent}>detailContent</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Youtube Section */}
      <div className={styles.detailYoutube}>detailYoutube</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Like Section */}
      <div className={styles.detailLike}>detailLike</div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Button Section */}
      <div className={styles.detailButton}>detailButton</div>
    </div>
  );
}

export default BoardsDetail;
