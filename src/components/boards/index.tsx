"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SearchBar } from "@/commons/components/searchbar";
import { DatePicker } from "@/commons/components/datepicker";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import styles from "./styles.module.css";

/**
 * Boards Component
 * 게시판 페이지의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Search, List 영역으로 구성됩니다.
 */
export function Boards() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // 임시 게시글 데이터
  const boardData = [
    { id: 243, title: "제주 살이 1일차", author: "홍길동", date: "2024.12.16" },
    {
      id: 242,
      title: "강남 살이 100년차",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 241,
      title: "길 걷고 있었는데 고양이한테 간택 받았어요",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 240,
      title: "오늘 날씨 너무 좋아서 바다보러 왔어요~",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 239,
      title: "누가 양양 핫하다고 했어 나밖에 없는데?",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 238,
      title: "여름에 보드타고 싶은거 저밖에 없나요 🥲",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 237,
      title:
        "사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행 가야겠어요",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 236,
      title: "여기는 기승전 여행이네요 ㅋㅋㅋ",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 235,
      title: "상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까",
      author: "홍길동",
      date: "2024.12.16",
    },
    {
      id: 234,
      title: "강릉 여름바다 보기 좋네요",
      author: "홍길동",
      date: "2024.12.16",
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <div className={styles.list}>
        <div className={styles.listContent}>
          {/* 헤더 영역 */}
          <div className={styles.listHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerTitle}>제목</div>
            <div className={styles.headerAuthor}>작성자</div>
            <div className={styles.headerDate}>날짜</div>
          </div>
          {/* 리스트 아이템 영역 */}
          <div className={styles.listItems}>
            {boardData.map((item) => (
              <div key={item.id} className={styles.listItem}>
                <div className={styles.itemNumber}>{item.id}</div>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemAuthor}>{item.author}</div>
                <div className={styles.itemDate}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        {/* 페이지네이션 영역 */}
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="medium"
            showNavigationArrows={true}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Boards;
