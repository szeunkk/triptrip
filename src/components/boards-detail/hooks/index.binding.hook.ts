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
 * YouTube URL에서 Video ID를 추출하는 유틸리티 함수
 * 다양한 YouTube URL 형식을 지원합니다.
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 *
 * @param url - YouTube URL
 * @returns Video ID 또는 null
 */
export function extractYoutubeVideoId(url?: string): string | null {
  if (!url) return null;

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
}

/**
 * 날짜를 YYYY.MM.DD 형식으로 변환하는 유틸리티 함수
 *
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns YYYY.MM.DD 형식의 날짜 문자열
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/**
 * 게시글 이미지의 전체 URL을 생성하는 유틸리티 함수
 * Google Storage의 이미지 경로를 전체 URL로 변환합니다.
 *
 * @param images - 이미지 경로 배열
 * @param index - 가져올 이미지의 인덱스 (기본값: 0)
 * @returns 이미지 전체 URL 또는 null
 */
export function getBoardImageUrl(
  images?: string[],
  index: number = 0
): string | null {
  if (!images || images.length === 0) return null;
  if (index >= images.length) return null;

  return `https://storage.googleapis.com/${images[index]}`;
}

/**
 * YouTube 썸네일 URL을 생성하는 유틸리티 함수
 * YouTube URL에서 Video ID를 추출하여 썸네일 이미지 URL을 생성합니다.
 *
 * @param youtubeUrl - YouTube URL
 * @returns YouTube 썸네일 이미지 URL 또는 null
 */
export function getYoutubeThumbnailUrl(youtubeUrl?: string): string | null {
  const videoId = extractYoutubeVideoId(youtubeUrl);
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
