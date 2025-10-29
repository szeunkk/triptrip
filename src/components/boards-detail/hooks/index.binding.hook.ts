"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import type { ApolloError } from "@apollo/client";

/**
 * GraphQL 쿼리 정의
 * fetchBoard 쿼리를 사용하여 게시글 상세 정보를 가져옵니다.
 */
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      createdAt
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        address
        addressDetail
      }
    }
  }
`;

/**
 * 게시글 주소 타입 정의
 */
export interface IBoardAddress {
  address?: string;
  addressDetail?: string;
}

/**
 * 게시글 데이터 타입 정의
 */
export interface IBoard {
  _id: string;
  writer?: string;
  title?: string;
  createdAt?: string;
  contents?: string;
  youtubeUrl?: string;
  likeCount?: number;
  dislikeCount?: number;
  images?: string[];
  boardAddress?: IBoardAddress;
}

/**
 * fetchBoard 쿼리 응답 타입
 */
export interface IFetchBoardResponse {
  fetchBoard: IBoard;
}

/**
 * fetchBoard 쿼리 변수 타입
 */
export interface IFetchBoardVariables {
  boardId: string;
}

/**
 * useFetchBoard 훅 반환 타입
 */
export interface IUseFetchBoardReturn {
  data: IFetchBoardResponse | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

/**
 * 게시글 상세 데이터를 가져오는 커스텀 훅
 * Apollo Client의 useQuery를 사용하여 fetchBoard GraphQL 쿼리를 실행합니다.
 * 다이나믹 라우팅된 boardId를 useParams로 추출하여 사용합니다.
 *
 * @returns {Object} 쿼리 결과 객체
 * @returns {IFetchBoardResponse | undefined} data - 게시글 상세 데이터
 * @returns {boolean} loading - 로딩 상태
 * @returns {ApolloError | undefined} error - 에러 객체
 */
export function useFetchBoard(): IUseFetchBoardReturn {
  const params = useParams();
  const boardId = params.boardId as string;

  const { data, loading, error } = useQuery<
    IFetchBoardResponse,
    IFetchBoardVariables
  >(FETCH_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  return {
    data,
    loading,
    error,
  };
}

/**
 * YouTube URL에서 Video ID 추출
 * @param url YouTube URL
 * @returns Video ID or null
 */
export const extractYoutubeVideoId = (url?: string): string | null => {
  if (!url) return null;

  // 다양한 YouTube URL 형식 지원
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * 날짜를 YYYY.MM.DD 형식으로 변환
 * @param dateString 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

/**
 * 게시글 상세 이미지 URL 생성
 * @param images 이미지 배열
 * @param index 이미지 인덱스
 * @returns 이미지 URL or null
 */
export const getBoardImageUrl = (
  images?: string[],
  index: number = 0
): string | null => {
  if (!images || images.length === 0) return null;
  if (index >= images.length) return null;

  return `https://storage.googleapis.com/${images[index]}`;
};

/**
 * YouTube 썸네일 URL 생성
 * @param youtubeUrl YouTube URL
 * @returns 썸네일 URL or null
 */
export const getYoutubeThumbnailUrl = (youtubeUrl?: string): string | null => {
  const videoId = extractYoutubeVideoId(youtubeUrl);
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};
