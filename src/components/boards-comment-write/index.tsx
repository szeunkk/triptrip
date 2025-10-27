"use client";

import React from "react";
import { Input } from "@/commons/components/input";
import styles from "./styles.module.css";

/**
 * BoardsCommentWrite Component
 * 게시판 댓글 작성 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Rate, Writer, Content, Button 영역으로 구성됩니다.
 */
export function BoardsCommentWrite() {
  return (
    <div className={styles.container}>
      {/* Comment Rate Section */}
      <div className={styles.commentRate}></div>

      {/* Gap */}
      <div className={styles.gap24}></div>

      {/* Comment Writer Section */}
      <div className={styles.commentWriter}>
        <Input
          variant="outlined"
          size="medium"
          label="작성자"
          required
          placeholder="작성자 명을 입력해 주세요."
          className={styles.writerInput}
        />
        <Input
          variant="outlined"
          size="medium"
          label="비밀번호"
          required
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          className={styles.writerInput}
        />
      </div>

      {/* Gap */}
      <div className={styles.gap16}></div>

      {/* Comment Content Section */}
      <div className={styles.commentContent}></div>

      {/* Gap */}
      <div className={styles.gap16}></div>

      {/* Comment Button Section */}
      <div className={styles.commentButton}></div>
    </div>
  );
}

export default BoardsCommentWrite;
