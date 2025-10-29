"use client";

import { useRouter } from "next/navigation";
import { url } from "@/commons/constants/url";

/**
 * Boards Best Link Routing Hook 반환 타입
 */
export interface IUseBoardsBestLinkRoutingReturn {
  /** 카드 클릭 핸들러 (게시글 상세 페이지로 이동하는 함수) */
  handleCardClick: (boardId: string) => void;
}

/**
 * 베스트 게시글 카드의 링크 라우팅을 처리하는 커스텀 훅
 * - 카드 클릭 시: /boards/[boardId] 페이지로 이동
 *
 * @returns {IUseBoardsBestLinkRoutingReturn} 라우팅 핸들러 함수
 */
export function useBoardsBestLinkRouting(): IUseBoardsBestLinkRoutingReturn {
  const router = useRouter();

  /**
   * 카드 클릭 핸들러
   * 게시글 상세 페이지로 이동
   * @param boardId - 게시글 ID
   */
  const handleCardClick = (boardId: string) => {
    router.push(url.boards.detail.path(boardId));
  };

  return {
    handleCardClick,
  };
}
