"use client";

import { useParams, useRouter } from "next/navigation";
import { url } from "@/commons/constants/url";

/**
 * Link Routing Hook 반환 타입
 */
export interface IUseLinkRoutingReturn {
  /** 게시글 목록 페이지로 이동하는 함수 */
  handleGoToList: () => void;
  /** 게시글 수정 페이지로 이동하는 함수 */
  handleGoToEdit: () => void;
}

/**
 * 게시글 상세 페이지의 링크 라우팅을 처리하는 커스텀 훅
 * - 목록으로 버튼: /boards 페이지로 이동
 * - 수정하기 버튼: /boards/[boardId]/edit 페이지로 이동
 *
 * @returns {IUseLinkRoutingReturn} 라우팅 핸들러 함수들
 */
export function useLinkRouting(): IUseLinkRoutingReturn {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  /**
   * 게시글 목록 페이지로 이동
   */
  const handleGoToList = () => {
    router.push(url.boards.list.path);
  };

  /**
   * 게시글 수정 페이지로 이동
   */
  const handleGoToEdit = () => {
    if (boardId) {
      router.push(url.boards.edit.path(boardId));
    }
  };

  return {
    handleGoToList,
    handleGoToEdit,
  };
}
