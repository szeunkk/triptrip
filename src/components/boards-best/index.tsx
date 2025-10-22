"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

/**
 * BoardsBest Component
 * 게시판 베스트 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Gap, Best 영역으로 구성됩니다.
 */
export function BoardsBest() {
  // 임시 베스트 게시글 데이터
  const bestTalks = [
    {
      id: 1,
      image: "/images/img-1.svg",
      title: "제주 살이 1일차 청산별곡이 생각나네요",
      profileImage: "/images/profile/1.svg",
      userName: "홍길동",
      goodCount: 24,
      date: "2024.11.11",
    },
    {
      id: 2,
      image: "/images/img-2.svg",
      title: "길 걷고 있었는데 고양이한테 간택 받았어요",
      profileImage: "/images/profile/2.svg",
      userName: "홍길동",
      goodCount: 24,
      date: "2024.11.11",
    },
    {
      id: 3,
      image: "/images/img-3.svg",
      title: "강릉 여름바다 보기 좋네요 서핑하고 싶어요!",
      profileImage: "/images/profile/3.svg",
      userName: "홍길동",
      goodCount: 24,
      date: "2024.11.11",
    },
    {
      id: 4,
      image: "/images/img-4.svg",
      title: "누가 양양 핫하다고 했어 나밖에 없는데?",
      profileImage: "/images/profile/4.svg",
      userName: "홍길동",
      goodCount: 24,
      date: "2024.11.11",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>오늘 핫한 트립토크</h2>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.best}>
        {bestTalks.map((talk) => (
          <div key={talk.id} className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                src={talk.image}
                alt={talk.title}
                width={112}
                height={152}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{talk.title}</h3>
                <div className={styles.profile}>
                  <div className={styles.profileImage}>
                    <Image
                      src={talk.profileImage}
                      alt={talk.userName}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.userName}>{talk.userName}</span>
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
                  <span className={styles.goodCount}>{talk.goodCount}</span>
                </div>
                <span className={styles.date}>{talk.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardsBest;
