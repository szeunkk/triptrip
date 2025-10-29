"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SearchBar } from "@/commons/components/searchbar";
import { DatePicker } from "@/commons/components/datepicker";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import {
  useFetchBoards,
  formatDate,
  convertToISODate,
} from "./hooks/index.binding.hook";
import { useBoardsPagination } from "./hooks/index.pagination.hook";
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

  // 날짜 검색: startDate와 endDate가 모두 입력되었을 때만 검색
  const hasCompleteDateRange = dateRange.startDate && dateRange.endDate;

  // 페이지네이션 데이터 가져오기
  const {
    lastPage,
    itemNumbers,
    setCurrentPage: setPaginationPage,
  } = useBoardsPagination({
    search: searchKeyword || undefined,
    startDate: hasCompleteDateRange
      ? convertToISODate(dateRange.startDate, false)
      : undefined,
    endDate: hasCompleteDateRange
      ? convertToISODate(dateRange.endDate, true)
      : undefined,
    initialPage: currentPage,
  });

  // API 데이터 가져오기 (날짜를 ISO 8601 형식으로 변환)
  const { data, loading, error } = useFetchBoards({
    page: currentPage,
    search: searchKeyword || undefined,
    startDate: hasCompleteDateRange
      ? convertToISODate(dateRange.startDate, false)
      : undefined,
    endDate: hasCompleteDateRange
      ? convertToISODate(dateRange.endDate, true)
      : undefined,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPaginationPage(page);
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
    setDateRange((prev) => {
      const newRange = { ...prev, startDate: date };
      // startDate와 endDate가 모두 있을 때만 첫 페이지로 이동
      if (newRange.startDate && newRange.endDate) {
        setCurrentPage(1);
      }
      return newRange;
    });
  };

  const handleEndDateChange = (date: string) => {
    setDateRange((prev) => {
      const newRange = { ...prev, endDate: date };
      // startDate와 endDate가 모두 있을 때만 첫 페이지로 이동
      if (newRange.startDate && newRange.endDate) {
        setCurrentPage(1);
      }
      return newRange;
    });
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
                  data-testid={`board-item-${index}`}
                >
                  <div
                    className={styles.itemNumber}
                    data-testid={`board-item-number-${index}`}
                  >
                    {itemNumbers[index] || index + 1}
                  </div>
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
        <div className={styles.paginationWrapper} data-testid="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={lastPage}
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
