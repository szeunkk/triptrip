"use client";

import React, { useState } from "react";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

/**
 * BoardsCommentWrite Component
 * 게시판 댓글 작성 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Rate, Writer, Content, Button 영역으로 구성됩니다.
 */
export function BoardsCommentWrite() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className={styles.container}>
      {/* Comment Rate Section */}
      <div className={styles.commentRate}>
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            type="button"
            className={styles.starButton}
            onClick={() => handleStarClick(index)}
            aria-label={`${index + 1}점`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={
                index < rating ? styles.starActive : styles.starInactive
              }
            >
              <path d="M12.0016 16.688L8.11135 19.034C7.96635 19.1187 7.8211 19.1543 7.6756 19.1407C7.5301 19.1273 7.39843 19.0782 7.2806 18.9938C7.1626 18.9091 7.07151 18.7985 7.00735 18.662C6.94335 18.5255 6.9331 18.3745 6.9766 18.209L8.00935 13.7917L4.57485 10.8187C4.44651 10.7073 4.36476 10.5781 4.3296 10.4313C4.29426 10.2844 4.30351 10.1418 4.35735 10.0033C4.41118 9.86492 4.48876 9.75183 4.5901 9.664C4.69143 9.57617 4.82993 9.51875 5.0056 9.49175L9.5381 9.09575L11.2978 4.9245C11.3618 4.76933 11.4589 4.65458 11.5891 4.58025C11.7193 4.50592 11.8568 4.46875 12.0016 4.46875C12.1464 4.46875 12.2839 4.50592 12.4141 4.58025C12.5443 4.65458 12.6413 4.76933 12.7053 4.9245L14.4651 9.09575L18.9976 9.49175C19.1733 9.51875 19.3118 9.57617 19.4131 9.664C19.5144 9.75183 19.592 9.86492 19.6458 10.0033C19.6997 10.1418 19.7089 10.2844 19.6736 10.4313C19.6384 10.5781 19.5567 10.7073 19.4283 10.8187L15.9938 13.7917L17.0266 18.209C17.0701 18.3745 17.0598 18.5255 16.9958 18.662C16.9317 18.7985 16.8406 18.9091 16.7226 18.9938C16.6048 19.0782 16.4731 19.1273 16.3276 19.1407C16.1821 19.1543 16.0368 19.1187 15.8918 19.034L12.0016 16.688Z" />
            </svg>
          </button>
        ))}
      </div>

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
      <div className={styles.commentContent}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해 주세요."
          maxLength={100}
        />
        <div className={styles.charCount}>0/100</div>
      </div>

      {/* Gap */}
      <div className={styles.gap16}></div>

      {/* Comment Button Section */}
      <div className={styles.commentButton}>
        <Button
          variant="tertiary"
          size="medium"
          shape="rectangle"
          className={styles.cancelButton}
        >
          취소
        </Button>
        <Button
          variant="secondary"
          size="medium"
          shape="rectangle"
          className={styles.submitButton}
        >
          댓글 등록
        </Button>
      </div>
    </div>
  );
}

export default BoardsCommentWrite;
