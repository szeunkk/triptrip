"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SearchBar } from "@/commons/components/searchbar";
import { DatePicker } from "@/commons/components/datepicker";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import { useFetchBoards, formatDate } from "./hooks/index.binding.hook";
import styles from "./styles.module.css";

/**
 * Boards Component
 * 게시판 페이지의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Search, List 영역으로 구성됩니다.
 */
export function Boards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  // API 데이터 가져오기
  const { data, loading, error } = useFetchBoards({
    page: currentPage,
    search: searchKeyword || undefined,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const totalPages = 5; // TODO: API에서 전체 페이지 수를 가져올 수 있다면 동적으로 설정

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchKeyword(inputValue);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleStartDateChange = (date: string) => {
    setDateRange((prev) => ({ ...prev, startDate: date }));
    setCurrentPage(1); // 날짜 변경 시 첫 페이지로 이동
  };

  const handleEndDateChange = (date: string) => {
    setDateRange((prev) => ({ ...prev, endDate: date }));
    setCurrentPage(1); // 날짜 변경 시 첫 페이지로 이동
  };

  // 게시글 데이터 (실제 API 데이터 사용)
  const boardData = data?.fetchBoards || [];

  return (
    <div className={styles.container}>
      <div className={styles.title}>트립토크 게시판</div>
      <div className={styles.gap}></div>
      <div className={styles.search}>
        <div className={styles.searchLeft}>
          <DatePicker
            size="medium"
            className={styles.datePicker}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
          <SearchBar
            variant="default"
            size="medium"
            placeholder="제목을 검색해 주세요."
            className={styles.searchBar}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            data-testid="search-input"
          />
          <Button
            variant="secondary"
            size="medium"
            shape="rectangle"
            className={styles.searchButton}
            onClick={handleSearch}
            data-testid="search-button"
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
            {loading && <div className={styles.loadingMessage}>로딩 중...</div>}
            {error && (
              <div className={styles.errorMessage} data-testid="error-message">
                데이터를 불러오는데 실패했습니다.
              </div>
            )}
            {!loading && !error && boardData.length === 0 && (
              <div className={styles.emptyMessage}>게시글이 없습니다.</div>
            )}
            {!loading &&
              !error &&
              boardData.map((item, index) => (
                <div
                  key={item._id}
                  className={styles.listItem}
                  data-testid={`board-item-${item._id}`}
                >
                  <div className={styles.itemNumber}>{index + 1}</div>
                  <div
                    className={styles.itemTitle}
                    data-testid={`board-title-${item._id}`}
                  >
                    {item.title}
                  </div>
                  <div
                    className={styles.itemAuthor}
                    data-testid={`board-author-${item._id}`}
                  >
                    {item.writer}
                  </div>
                  <div
                    className={styles.itemDate}
                    data-testid={`board-date-${item._id}`}
                  >
                    {formatDate(item.createdAt)}
                  </div>
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
