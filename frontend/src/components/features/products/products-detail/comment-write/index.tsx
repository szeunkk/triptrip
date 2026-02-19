"use client";

import { useState } from "react";
import { Button } from "@commons/ui";
import styles from "./styles.module.css";

export default function ProductsDetailCommentWrite() {
  const [comment, setComment] = useState("");
  const MAX_LENGTH = 100;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setComment(value);
    }
  };

  const handleSubmit = () => {
    console.log("Comment:", comment);
    // API 연동 예정
  };

  return (
    <div className={styles.commentWrite} data-testid="comment-write">
      {/* Title Section */}
      <div className={styles.title} data-testid="comment-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.0385 17.5L4.0365 19.5018C3.752 19.7864 3.42475 19.8509 3.05475 19.6952C2.68492 19.5394 2.5 19.2589 2.5 18.8538V4.30775C2.5 3.80258 2.675 3.375 3.025 3.025C3.375 2.675 3.80258 2.5 4.30775 2.5H19.6923C20.1974 2.5 20.625 2.675 20.975 3.025C21.325 3.375 21.5 3.80258 21.5 4.30775V15.6923C21.5 16.1974 21.325 16.625 20.975 16.975C20.625 17.325 20.1974 17.5 19.6923 17.5H6.0385ZM5.4 16H19.6923C19.7693 16 19.8398 15.9679 19.9038 15.9038C19.9679 15.8398 20 15.7692 20 15.6923V4.30775C20 4.23075 19.9679 4.16025 19.9038 4.09625C19.8398 4.03208 19.7693 4 19.6923 4H4.30775C4.23075 4 4.16025 4.03208 4.09625 4.09625C4.03208 4.16025 4 4.23075 4 4.30775V17.3848L5.4 16Z"
            fill="var(--color-gray-800)"
          />
        </svg>
        <span className={styles.titleText}>문의하기</span>
      </div>

      {/* Content Section */}
      <div className={styles.content} data-testid="comment-content">
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="문의사항을 입력해 주세요."
            value={comment}
            onChange={handleCommentChange}
            data-testid="comment-textarea"
          />
          <div className={styles.count} data-testid="comment-count">
            {comment.length}/{MAX_LENGTH}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="CommentBtn" type="submit" onClick={handleSubmit}>
            문의 하기
          </Button>
        </div>
      </div>
    </div>
  );
}
