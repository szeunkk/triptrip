"use client";

import React from "react";
import Image from "next/image";
import { SearchBar } from "@/commons/components/searchbar";
import { DatePicker } from "@/commons/components/datepicker";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

/**
 * Boards Component
 * 게시판 페이지의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Search, List 영역으로 구성됩니다.
 */
export function Boards() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>트립토크 게시판</div>
      <div className={styles.gap}></div>
      <div className={styles.search}>
        <div className={styles.searchLeft}>
          <DatePicker size="medium" className={styles.datePicker} />
          <SearchBar
            variant="default"
            size="medium"
            placeholder="제목을 검색해 주세요."
            className={styles.searchBar}
          />
          <Button
            variant="secondary"
            size="medium"
            shape="rectangle"
            className={styles.searchButton}
          >
            검색
          </Button>
        </div>
        <Button
          variant="primary"
          size="medium"
          shape="rectangle"
          className={styles.writeButton}
        >
          <Image src="/icons/write(w).svg" alt="write" width={24} height={24} />
          트립토크 등록
        </Button>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.list}>list</div>
    </div>
  );
}

export default Boards;
