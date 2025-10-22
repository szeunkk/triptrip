"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

/**
 * BoardsDetail Component
 * 게시판 상세보기 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Writer, Image, Content, Youtube, Like, Button 영역으로 구성됩니다.
 */
export function BoardsDetail() {
  // 임시 게시글 상세 데이터
  const boardDetail = {
    title:
      "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라",
    writer: {
      profileImage: "/images/profile/1.svg",
      name: "홍길동",
    },
    date: "2024.11.11",
    mainImage: "/images/boardsdetail_image.png",
    content: `살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
얄리얄리 얄라셩 얄라리 얄라

가다 보니 배불룩한 술독에 독한 술을 빚는구나.
조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
얄리얄리 얄라셩 얄라리 얄라`,
    youtubeImage: "/images/boardsdetail_image_2.png",
    likes: {
      good: 24,
      bad: 24,
    },
  };

  return (
    <div className={styles.container}>
      {/* Detail Title Section */}
      <div className={styles.detailTitle}>
        <h1 className={styles.titleText}>{boardDetail.title}</h1>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Writer Section */}
      <div className={styles.detailWriter}>
        <div className={styles.writerTop}>
          <div className={styles.profile}>
            <Image
              src={boardDetail.writer.profileImage}
              alt="profile"
              width={24}
              height={24}
              className={styles.profileImg}
            />
            <span className={styles.profileName}>
              {boardDetail.writer.name}
            </span>
          </div>
          <div className={styles.dateArea}>
            <span className={styles.dateText}>{boardDetail.date}</span>
          </div>
        </div>
        <div className={styles.writerLine}></div>
        <div className={styles.writerIcons}>
          <Image
            src="/icons/link.svg"
            alt="link"
            width={24}
            height={24}
            className={styles.icon}
          />
          <Image
            src="/icons/location.svg"
            alt="location"
            width={24}
            height={24}
            className={styles.icon}
          />
        </div>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Image Section */}
      <div className={styles.detailImage}>
        <Image
          src={boardDetail.mainImage}
          alt="detail"
          width={400}
          height={531}
          className={styles.mainImage}
        />
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Content Section */}
      <div className={styles.detailContent}>
        <p className={styles.contentText}>{boardDetail.content}</p>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Youtube Section */}
      <div className={styles.detailYoutube}>
        <div className={styles.youtubeImageWrapper}>
          <Image
            src={boardDetail.youtubeImage}
            alt="youtube"
            width={822}
            height={464}
            className={styles.youtubeImage}
          />
          <div className={styles.youtubeIconWrapper}>
            <Image
              src="/icons/youtube.svg"
              alt="youtube"
              width={44}
              height={44}
              className={styles.youtubeIcon}
            />
          </div>
        </div>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Like Section */}
      <div className={styles.detailLike}>
        <div className={styles.likeArea}>
          <div className={styles.badArea}>
            <Image
              src="/icons/bad.svg"
              alt="bad"
              width={24}
              height={24}
              className={styles.likeIcon}
            />
            <span className={styles.badCount}>{boardDetail.likes.bad}</span>
          </div>
          <div className={styles.goodArea}>
            <Image
              src="/icons/good.svg"
              alt="good"
              width={24}
              height={24}
              className={styles.likeIcon}
            />
            <span className={styles.goodCount}>{boardDetail.likes.good}</span>
          </div>
        </div>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Button Section */}
      <div className={styles.detailButton}>
        <Button
          variant="tertiary"
          size="small"
          shape="rectangle"
          className={styles.buttonItem}
        >
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
          목록으로
        </Button>
        <Button
          variant="tertiary"
          size="small"
          shape="rectangle"
          className={styles.buttonItem}
        >
          <Image src="/icons/edit.svg" alt="edit" width={24} height={24} />
          수정하기
        </Button>
      </div>
    </div>
  );
}

export default BoardsDetail;
