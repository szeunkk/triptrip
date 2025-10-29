"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";
import {
  useFetchBoard,
  formatDate,
  getBoardImageUrl,
  getYoutubeThumbnailUrl,
} from "./hooks/index.binding.hook";
import { useLinkRouting } from "./hooks/index.link.routing.hook";

/**
 * BoardsDetail Component
 * 게시판 상세보기 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Title, Writer, Image, Content, Youtube, Like, Button 영역으로 구성됩니다.
 */
export function BoardsDetail() {
  // 실제 게시글 상세 데이터 불러오기
  const { data, loading, error } = useFetchBoard();

  // 링크 라우팅 훅
  const { handleGoToList, handleGoToEdit } = useLinkRouting();

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className={styles.container} data-testid="board-loading">
        <div className={styles.detailTitle}>
          <h1 className={styles.titleText}>로딩 중...</h1>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error || !data?.fetchBoard) {
    return (
      <div className={styles.container} data-testid="board-error">
        <div className={styles.detailTitle}>
          <h1 className={styles.titleText}>게시글을 불러올 수 없습니다.</h1>
        </div>
      </div>
    );
  }

  // 데이터 바인딩
  const board = data.fetchBoard;
  // 최대 3개의 이미지 URL 배열 생성
  const boardImageUrls =
    board.images
      ?.map((_, index) => getBoardImageUrl(board.images, index))
      .filter((url): url is string => url !== null && url.length > 0) || [];
  const youtubeThumbnailUrl = getYoutubeThumbnailUrl(board.youtubeUrl);
  const formattedDate = formatDate(board.createdAt);

  return (
    <div className={styles.container}>
      {/* Detail Title Section */}
      <div className={styles.detailTitle}>
        <h1 className={styles.titleText} data-testid="board-title">
          {board.title || "제목 없음"}
        </h1>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Writer Section */}
      <div className={styles.detailWriter}>
        <div className={styles.writerTop}>
          <div className={styles.profile}>
            <Image
              src="/images/profile/7.svg"
              alt="profile"
              width={24}
              height={24}
              className={styles.profileImg}
            />
            <span className={styles.profileName} data-testid="board-writer">
              {board.writer || "작성자 미상"}
            </span>
          </div>
          <div className={styles.dateArea}>
            <span className={styles.dateText} data-testid="board-date">
              {formattedDate}
            </span>
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

      {/* Detail Image Section - 이미지가 있을 경우에만 표시 (최대 3개) */}
      {boardImageUrls.length > 0 && (
        <>
          <div className={styles.detailImage}>
            {boardImageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`detail-${index + 1}`}
                width={400}
                height={531}
                className={styles.mainImage}
                data-testid={`board-main-image-${index}`}
              />
            ))}
          </div>

          {/* Gap */}
          <div className={styles.gap}></div>
        </>
      )}

      {/* Detail Content Section */}
      <div className={styles.detailContent}>
        <p className={styles.contentText} data-testid="board-content">
          {board.contents || ""}
        </p>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Detail Youtube Section - YouTube URL이 있을 경우에만 표시 */}
      {youtubeThumbnailUrl && (
        <>
          <div className={styles.detailYoutube}>
            <div className={styles.youtubeImageWrapper}>
              <Image
                src={youtubeThumbnailUrl}
                alt="youtube"
                width={822}
                height={464}
                className={styles.youtubeImage}
                data-testid="board-youtube"
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
        </>
      )}

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
            <span className={styles.badCount} data-testid="board-dislike-count">
              {board.dislikeCount || 0}
            </span>
          </div>
          <div className={styles.goodArea}>
            <Image
              src="/icons/good.svg"
              alt="good"
              width={24}
              height={24}
              className={styles.likeIcon}
            />
            <span className={styles.goodCount} data-testid="board-like-count">
              {board.likeCount || 0}
            </span>
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
          onClick={handleGoToList}
          data-testid="button-list"
        >
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
          목록으로
        </Button>
        <Button
          variant="tertiary"
          size="small"
          shape="rectangle"
          className={styles.buttonItem}
          onClick={handleGoToEdit}
          data-testid="button-edit"
        >
          <Image src="/icons/edit.svg" alt="edit" width={24} height={24} />
          수정하기
        </Button>
      </div>
    </div>
  );
}

export default BoardsDetail;
