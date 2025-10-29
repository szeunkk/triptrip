"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useFetchBoardsOfTheBest } from "./hooks/index.binding.hook";

/**
 * BoardsBest Component
 * 게시판 베스트 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, Best 영역으로 구성됩니다.
 */
export function BoardsBest() {
  // 베스트 게시글 데이터 가져오기
  const { data, loading, error } = useFetchBoardsOfTheBest();

  // 날짜 포맷 함수 (YYYY.MM.DD)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 이미지 URL 생성 함수
  const getImageUrl = (images: string[], index: number): string => {
    if (images && images.length > 0 && images[0]) {
      return `https://storage.googleapis.com/${images[0]}`;
    }
    return `/images/img-${index + 1}.svg`;
  };

  // 프로필 이미지 URL 생성 함수
  const getProfileImageUrl = (index: number): string => {
    return `/images/profile/${index + 1}.svg`;
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.titleText}>오늘 핫한 트립토크</h2>
        </div>
        <div className={styles.gap}></div>
        <div className={styles.best}>{/* 로딩 상태 표시 */}</div>
      </div>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.titleText}>오늘 핫한 트립토크</h2>
        </div>
        <div className={styles.gap}></div>
        <div className={styles.best}>{/* 에러 상태 표시 */}</div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!data?.fetchBoardsOfTheBest || data.fetchBoardsOfTheBest.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.titleText}>오늘 핫한 트립토크</h2>
        </div>
        <div className={styles.gap}></div>
        <div className={styles.best}>{/* 데이터 없음 상태 표시 */}</div>
      </div>
    );
  }

  // 최대 4개의 게시글만 표시
  const bestTalks = data.fetchBoardsOfTheBest.slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>오늘 핫한 트립토크</h2>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.best}>
        {bestTalks.map((talk, index) => (
          <div
            key={talk._id}
            className={styles.card}
            data-testid="boards-best-card"
          >
            <div className={styles.cardImage}>
              <Image
                src={getImageUrl(talk.images, index)}
                alt={talk.title}
                width={112}
                height={152}
                className={styles.image}
                data-testid="card-image"
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle} data-testid="card-title">
                  {talk.title}
                </h3>
                <div className={styles.profile}>
                  <div className={styles.profileImage}>
                    <Image
                      src={getProfileImageUrl(index)}
                      alt={talk.writer}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.userName} data-testid="card-username">
                    {talk.writer}
                  </span>
                </div>
              </div>
              <div className={styles.cardBottom}>
                <div className={styles.goodArea}>
                  <Image
                    src="/icons/good.svg"
                    alt="좋아요"
                    width={24}
                    height={24}
                  />
                  <span
                    className={styles.goodCount}
                    data-testid="card-goodcount"
                  >
                    {talk.likeCount}
                  </span>
                </div>
                <span className={styles.date} data-testid="card-date">
                  {formatDate(talk.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardsBest;
