"use client";

import { useMemo, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.css";
import useBoards from "./hook.list";
import useBoardsOfTheBest from "./hook.best";

// 시간을 "N시간 전" 형식으로 변환하는 함수
const getTimeAgo = (dateString: string | undefined) => {
  if (!dateString) return "";

  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}개월 전`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years}년 전`;
  }
};

export default function OOTDList() {
  const { data, hasMore, onNext } = useBoards();
  const { best, onClickBoards } = useBoardsOfTheBest();
  const [columnCount, setColumnCount] = useState(4);

  // 화면 크기에 따라 컬럼 개수 조정
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setColumnCount(1);
      } else if (width <= 1200) {
        setColumnCount(2);
      } else {
        setColumnCount(4);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  // 컬럼으로 아이템 분배
  const columns = useMemo(() => {
    const boards = data?.fetchBoards ?? [];
    const cols: (typeof boards)[] = Array.from({ length: columnCount }, () => []);

    boards.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });

    return cols;
  }, [data?.fetchBoards, columnCount]);

  return (
    <div className={styles.container}>
      <section className={styles.bestSection}>
        <div className={styles.bestHeader}>
          <h2 className={styles.bestTitle}>리핏에서 지금 가장 주목받는 스타일</h2>
        </div>
        <div className={styles.bestGrid}>
          {best.map((item) => (
            <div
              key={item._id}
              className={styles.bestCard}
              data-testid={`best-card-${item._id}`}
              id={item._id}
              onClick={onClickBoards}
            >
              <div className={styles.bestImageWrapper}>
                <img
                  src={
                    !item.images || item.images.length === 0
                      ? `https://picsum.photos/seed/${item._id}/400/400`
                      : `https://storage.googleapis.com/${item.images[0]}`
                  }
                  alt={item.writer ?? ""}
                  className={styles.bestImage}
                />
                <div className={styles.bestGradient}></div>
                <div className={styles.bestBadge}>BEST</div>
              </div>
              <div className={styles.bestInfo}>
                <div className={styles.bestInfoTop}>
                  <span className={styles.bestUsername}>{item.writer}</span>
                  <div className={styles.bestLikes}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3_2775)">
                        <path
                          d="M1.16669 5.54173C1.1667 4.8926 1.36362 4.25874 1.73143 3.72387C2.09925 3.189 2.62066 2.77828 3.22679 2.54596C3.83293 2.31365 4.49528 2.27066 5.12636 2.42267C5.75744 2.57469 6.32757 2.91456 6.76144 3.3974C6.792 3.43007 6.82894 3.45612 6.86998 3.47393C6.91102 3.49174 6.95528 3.50093 7.00002 3.50093C7.04476 3.50093 7.08902 3.49174 7.13006 3.47393C7.1711 3.45612 7.20805 3.43007 7.2386 3.3974C7.67111 2.91142 8.24137 2.5687 8.87347 2.41483C9.50558 2.26097 10.1696 2.30327 10.777 2.5361C11.3845 2.76893 11.9067 3.18124 12.274 3.71817C12.6413 4.2551 12.8365 4.89117 12.8334 5.54173C12.8334 6.87756 11.9584 7.87506 11.0834 8.75006L7.87969 11.8493C7.77099 11.9742 7.63698 12.0744 7.48655 12.1435C7.33612 12.2126 7.17271 12.2488 7.00719 12.2499C6.84167 12.2509 6.67781 12.2167 6.52652 12.1496C6.37523 12.0824 6.23995 11.9838 6.12969 11.8604L2.91669 8.75006C2.04169 7.87506 1.16669 6.8834 1.16669 5.54173Z"
                          fill="#D4183D"
                          stroke="#D4183D"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_2775">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className={styles.bestLikesCount}>{item.likeCount}</span>
                  </div>
                </div>
                <span className={styles.bestDate}>{getTimeAgo(item.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cardSection}>
        <div className={styles.bestHeader}>
          <h2 className={styles.bestTitle}>오늘의 새로운 핏을 만나보세요</h2>
        </div>
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          loader={<div className={styles.loadingIndicator}>로딩중입니다</div>}
          dataLength={data?.fetchBoards.length ?? 0}
        >
          <div className={styles.cardMasonry}>
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.cardColumn}>
                {column.map((item) => (
                  <div
                    key={item._id}
                    className={styles.card}
                    data-testid={`card-${item._id}`}
                    id={item._id}
                    onClick={onClickBoards}
                  >
                    <div className={styles.cardImageWrapper}>
                      <img
                        src={
                          !item.images || item.images.length === 0
                            ? `https://picsum.photos/seed/${item._id}/400/400`
                            : `https://storage.googleapis.com/${item.images[0].replace(/ /g, "%20")}`
                        }
                        alt={item.writer as string}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardInfoTop}>
                        <span className={styles.cardUsername}>{item.writer}</span>
                        <div className={styles.cardLikes}>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_3_2842)">
                              <path
                                d="M1.16666 5.54173C1.16667 4.8926 1.36359 4.25874 1.7314 3.72387C2.09922 3.189 2.62062 2.77828 3.22676 2.54596C3.8329 2.31365 4.49525 2.27066 5.12633 2.42267C5.75741 2.57469 6.32754 2.91456 6.76141 3.3974C6.79196 3.43007 6.82891 3.45612 6.86995 3.47393C6.91099 3.49174 6.95525 3.50093 6.99999 3.50093C7.04473 3.50093 7.08899 3.49174 7.13003 3.47393C7.17107 3.45612 7.20801 3.43007 7.23857 3.3974C7.67108 2.91142 8.24134 2.5687 8.87344 2.41483C9.50555 2.26097 10.1695 2.30327 10.777 2.5361C11.3845 2.76893 11.9066 3.18124 12.274 3.71817C12.6413 4.2551 12.8364 4.89117 12.8333 5.54173C12.8333 6.87756 11.9583 7.87506 11.0833 8.75006L7.87966 11.8493C7.77096 11.9742 7.63695 12.0744 7.48652 12.1435C7.33609 12.2126 7.17268 12.2488 7.00716 12.2499C6.84164 12.2509 6.67778 12.2167 6.52649 12.1496C6.3752 12.0824 6.23992 11.9838 6.12966 11.8604L2.91666 8.75006C2.04166 7.87506 1.16666 6.8834 1.16666 5.54173Z"
                                stroke="#23345C"
                                strokeWidth="1.16667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3_2842">
                                <rect width="14" height="14" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span className={styles.cardLikesCount}>{item.likeCount}</span>
                        </div>
                      </div>
                      <span className={styles.cardDate}>{getTimeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
}
