"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

/**
 * GraphQL 쿼리: 게시글 상세 정보 조회
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
 * GraphQL 응답 타입 정의
 */
interface IBoardAddress {
  address?: string;
  addressDetail?: string;
}

interface IBoard {
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

interface IFetchBoardData {
  fetchBoard: IBoard;
}

interface IFetchBoardVariables {
  boardId: string;
}

/**
 * 게시글 상세 데이터를 불러오는 훅
 * @returns { data, loading, error }
 */
export const useFetchBoard = () => {
  const params = useParams();
  const boardId = params.boardId as string;

  const { data, loading, error } = useQuery<
    IFetchBoardData,
    IFetchBoardVariables
  >(FETCH_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  return { data, loading, error };
};

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
