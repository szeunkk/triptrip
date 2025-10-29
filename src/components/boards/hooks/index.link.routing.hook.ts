/**
 * Boards Link Routing Hook
 * 게시글 목록 클릭 및 등록 버튼 클릭 시 페이지 이동 기능을 제공합니다.
 *
 * @returns handleBoardClick - 게시글 클릭 핸들러 (게시글 상세 페이지로 이동)
 * @returns handleWriteClick - 등록 버튼 클릭 핸들러 (게시글 등록 페이지로 이동)
 */

import { useRouter } from "next/navigation";
import { url } from "@/commons/constants/url";

/**
 * Link Routing Hook 반환 타입
 */
export interface IUseBoardLinkRoutingReturn {
  /** 게시글 클릭 핸들러 (상세 페이지로 이동) */
  handleBoardClick: (boardId: string) => void;
  /** 등록 버튼 클릭 핸들러 (등록 페이지로 이동) */
  handleWriteClick: () => void;
}

/**
 * 게시글 링크 라우팅을 처리하는 커스텀 훅
 * - 게시글 클릭 시: /boards/[boardId] 페이지로 이동
 * - 등록 버튼 클릭 시: /boards/new 페이지로 이동
 *
 * @returns {IUseBoardLinkRoutingReturn} 라우팅 핸들러 함수들
 */
export function useBoardLinkRouting(): IUseBoardLinkRoutingReturn {
  const router = useRouter();

  /**
   * 게시글 클릭 핸들러
   * 게시글 상세 페이지로 이동
   * @param boardId - 게시글 ID
   */
  const handleBoardClick = (boardId: string) => {
    router.push(url.boards.detail.path(boardId));
  };

  /**
   * 등록 버튼 클릭 핸들러
   * 게시글 등록 페이지로 이동
   */
  const handleWriteClick = () => {
    router.push(url.boards.new.path);
  };

  return {
    handleBoardClick,
    handleWriteClick,
  };
}
