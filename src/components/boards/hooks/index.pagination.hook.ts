import { gql, useQuery } from "@apollo/client";
import { useState, useMemo } from "react";

/**
 * GraphQL 쿼리 정의
 * fetchBoardsCount 쿼리를 사용하여 전체 게시글 수를 가져옵니다.
 */
const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount(
    $startDate: DateTime
    $endDate: DateTime
    $search: String
  ) {
    fetchBoardsCount(startDate: $startDate, endDate: $endDate, search: $search)
  }
`;

/**
 * fetchBoardsCount 쿼리 응답 타입
 */
export interface IFetchBoardsCountResponse {
  fetchBoardsCount: number;
}

/**
 * fetchBoardsCount 쿼리 변수 타입
 */
export interface IFetchBoardsCountVariables {
  startDate?: string;
  endDate?: string;
  search?: string;
}

/**
 * useFetchBoardsCount 훅 반환 타입
 */
export interface IUseFetchBoardsCountReturn {
  data: IFetchBoardsCountResponse | undefined;
  loading: boolean;
  error: Error | undefined;
}

/**
 * 전체 게시글 수를 가져오는 커스텀 훅
 * Apollo Client의 useQuery를 사용하여 fetchBoardsCount GraphQL 쿼리를 실행합니다.
 *
 * @param variables - 쿼리 변수 (startDate, endDate, search)
 * @returns {Object} 쿼리 결과 객체
 * @returns {IFetchBoardsCountResponse | undefined} data - 전체 게시글 수 데이터
 * @returns {boolean} loading - 로딩 상태
 * @returns {Error | undefined} error - 에러 객체
 */
export function useFetchBoardsCount(
  variables?: IFetchBoardsCountVariables
): IUseFetchBoardsCountReturn {
  const { data, loading, error } = useQuery<
    IFetchBoardsCountResponse,
    IFetchBoardsCountVariables
  >(FETCH_BOARDS_COUNT, {
    variables,
  });

  return {
    data,
    loading,
    error: error as Error | undefined,
  };
}

/**
 * 페이지네이션 설정 상수
 */
export const PAGINATION_CONFIG = {
  rowsPerPage: 10, // 페이지당 게시글 수
  numPerPagegroup: 5, // 페이지 그룹당 페이지 수
} as const;

/**
 * 페이지네이션 훅 매개변수 타입
 */
export interface IUsePaginationParams {
  totalCount?: number; // 전체 게시글 수
  currentPage: number; // 현재 페이지
}

/**
 * 페이지네이션 훅 반환 타입
 */
export interface IUsePaginationReturn {
  lastPage: number; // 마지막 페이지 번호
  itemNumbers: number[]; // 현재 페이지의 게시글 번호 배열 (역순)
}

/**
 * 페이지네이션 로직을 처리하는 커스텀 훅
 *
 * @param params - 페이지네이션 매개변수
 * @param params.totalCount - 전체 게시글 수
 * @param params.currentPage - 현재 페이지 번호
 * @returns {Object} 페이지네이션 정보
 * @returns {number} lastPage - 마지막 페이지 번호
 * @returns {number[]} itemNumbers - 현재 페이지의 게시글 번호 배열 (역순)
 */
export function usePagination({
  totalCount = 0,
  currentPage,
}: IUsePaginationParams): IUsePaginationReturn {
  const { rowsPerPage } = PAGINATION_CONFIG;

  // 마지막 페이지 계산
  // 데이터가 없을 경우 기본값(rowsPerPage)로 나누어 1페이지 이상을 보장
  const lastPage = useMemo(() => {
    if (totalCount === 0) {
      return Math.ceil(rowsPerPage / rowsPerPage); // 1
    }
    return Math.ceil(totalCount / rowsPerPage);
  }, [totalCount, rowsPerPage]);

  // 현재 페이지의 게시글 번호 배열 계산 (역순)
  const itemNumbers = useMemo(() => {
    if (totalCount === 0) {
      return [];
    }

    // 현재 페이지의 시작 번호 (역순)
    // 예) 총 123개, 1페이지: 123, 2페이지: 113, 3페이지: 103
    const startNumber = totalCount - (currentPage - 1) * rowsPerPage;

    // 현재 페이지의 게시글 번호 배열 생성
    const numbers: number[] = [];
    for (let i = 0; i < rowsPerPage; i++) {
      const number = startNumber - i;
      if (number > 0) {
        numbers.push(number);
      }
    }

    return numbers;
  }, [totalCount, currentPage, rowsPerPage]);

  return {
    lastPage,
    itemNumbers,
  };
}

/**
 * 페이지네이션과 게시글 수를 함께 관리하는 통합 훅
 *
 * @param variables - GraphQL 쿼리 변수
 * @returns 페이지네이션 정보와 상태 관리
 */
export interface IUseBoardsPaginationParams {
  startDate?: string;
  endDate?: string;
  search?: string;
  initialPage?: number;
}

export interface IUseBoardsPaginationReturn {
  // 쿼리 결과
  totalCount: number;
  loading: boolean;
  error: Error | undefined;

  // 페이지네이션 상태
  currentPage: number;
  lastPage: number;
  itemNumbers: number[];

  // 페이지 변경 함수
  setCurrentPage: (page: number) => void;
}

/**
 * 게시판 페이지네이션을 위한 통합 커스텀 훅
 * fetchBoardsCount API를 호출하고 페이지네이션 로직을 처리합니다.
 *
 * @param params - 페이지네이션 매개변수
 * @param params.startDate - 시작 날짜
 * @param params.endDate - 종료 날짜
 * @param params.search - 검색어
 * @param params.initialPage - 초기 페이지 (기본값: 1)
 * @returns {Object} 페이지네이션 정보와 상태
 * @returns {number} totalCount - 전체 게시글 수
 * @returns {boolean} loading - 로딩 상태
 * @returns {Error | undefined} error - 에러 객체
 * @returns {number} currentPage - 현재 페이지
 * @returns {number} lastPage - 마지막 페이지
 * @returns {number[]} itemNumbers - 게시글 번호 배열 (역순)
 * @returns {Function} setCurrentPage - 페이지 변경 함수
 */
export function useBoardsPagination({
  startDate,
  endDate,
  search,
  initialPage = 1,
}: IUseBoardsPaginationParams = {}): IUseBoardsPaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 전체 게시글 수 가져오기
  const { data, loading, error } = useFetchBoardsCount({
    startDate,
    endDate,
    search,
  });

  const totalCount = data?.fetchBoardsCount ?? 0;

  // 페이지네이션 계산
  const { lastPage, itemNumbers } = usePagination({
    totalCount,
    currentPage,
  });

  return {
    totalCount,
    loading,
    error,
    currentPage,
    lastPage,
    itemNumbers,
    setCurrentPage,
  };
}
