"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

/**
 * BoardsNew Component
 * 게시판 새글쓰기 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, Form, Gap, Button 영역으로 구성됩니다.
 */
export function BoardsNew() {
  return (
    <div className={styles.container}>
      {/* Title Section */}
      <div className={styles.title}>게시물 등록</div>

      {/* Gap1 */}
      <div className={styles.gap1}></div>

      {/* Form Section */}
      <div className={styles.form}>
        {/* 작성자 & 비밀번호 */}
        <div className={styles.formRow}>
          <div className={styles.formRowItem}>
            <Input
              variant="outlined"
              size="medium"
              label="작성자"
              required
              placeholder="작성자 명을 입력해 주세요."
              className={styles.formField}
            />
          </div>
          <div className={styles.formRowItem}>
            <Input
              variant="outlined"
              size="medium"
              label="비밀번호"
              required
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              className={styles.formField}
            />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.formDivider}></div>

        {/* 제목 */}
        <Input
          variant="outlined"
          size="medium"
          label="제목"
          required
          placeholder="제목을 입력해 주세요."
          className={styles.formField}
        />

        {/* Divider */}
        <div className={styles.formDivider}></div>

        {/* 내용 */}
        <div className={styles.contentArea}>
          <label className={styles.contentLabel}>
            내용
            <span className={styles.contentRequired}>*</span>
          </label>
          <textarea
            className={styles.contentTextarea}
            placeholder="내용을 입력해 주세요."
          />
        </div>

        {/* 주소 */}
        <div className={styles.addressSection}>
          <div className={styles.addressRow}>
            <Input
              variant="outlined"
              size="medium"
              label="주소"
              placeholder="01234"
              className={styles.zipCodeInput}
            />
            <Button
              variant="tertiary"
              size="medium"
              shape="rectangle"
              className={styles.zipCodeButton}
            >
              우편번호 검색
            </Button>
          </div>
          <Input
            variant="outlined"
            size="medium"
            placeholder="주소를 입력해 주세요."
            className={styles.formField}
          />
          <Input
            variant="outlined"
            size="medium"
            placeholder="상세주소"
            className={styles.formField}
          />
        </div>

        {/* Divider */}
        <div className={styles.formDivider}></div>

        {/* 유튜브 링크 */}
        <Input
          variant="outlined"
          size="medium"
          label="유튜브 링크"
          placeholder="링크를 입력해 주세요."
          className={styles.formField}
        />

        {/* Divider */}
        <div className={styles.formDivider}></div>

        {/* 사진 첨부 */}
        <div className={styles.imageUploadSection}>
          <div className={styles.imageUploadLabel}>사진 첨부</div>
          <div className={styles.imageUploadRow}>
            <div className={styles.imageUploadItem}>
              <Image
                src="/icons/add.svg"
                alt="add"
                width={40}
                height={40}
                className={styles.imageUploadIcon}
              />
              <span className={styles.imageUploadText}>
                클릭해서 사진 업로드
              </span>
            </div>
            <div className={styles.imageUploadItem}>
              <Image
                src="/icons/add.svg"
                alt="add"
                width={40}
                height={40}
                className={styles.imageUploadIcon}
              />
              <span className={styles.imageUploadText}>
                클릭해서 사진 업로드
              </span>
            </div>
            <div className={styles.imageUploadItem}>
              <Image
                src="/icons/add.svg"
                alt="add"
                width={40}
                height={40}
                className={styles.imageUploadIcon}
              />
              <span className={styles.imageUploadText}>
                클릭해서 사진 업로드
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gap2 */}
      <div className={styles.gap2}></div>

      {/* Button Section */}
      <div className={styles.button}>
        <Button
          variant="tertiary"
          size="medium"
          shape="rectangle"
          className={styles.submitButton}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="medium"
          shape="rectangle"
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default BoardsNew;
