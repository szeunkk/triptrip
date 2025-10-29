import { gql, useQuery } from "@apollo/client";

/**
 * GraphQL 쿼리 정의
 * fetchBoards 쿼리를 사용하여 게시글 목록을 가져옵니다.
 */
const FETCH_BOARDS = gql`
  query fetchBoards(
    $startDate: DateTime
    $endDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      startDate: $startDate
      endDate: $endDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

/**
 * 게시글 데이터 타입 정의
 */
export interface IBoard {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

/**
 * fetchBoards 쿼리 응답 타입
 */
export interface IFetchBoardsResponse {
  fetchBoards: IBoard[];
}

/**
 * fetchBoards 쿼리 변수 타입
 */
export interface IFetchBoardsVariables {
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
}

/**
 * useFetchBoards 훅 반환 타입
 */
export interface IUseFetchBoardsReturn {
  data: IFetchBoardsResponse | undefined;
  loading: boolean;
  error: Error | undefined;
}

/**
 * 날짜를 YYYY.MM.DD 형식으로 변환하는 유틸리티 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns YYYY.MM.DD 형식의 날짜 문자열
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

/**
 * 게시글 목록을 가져오는 커스텀 훅
 * Apollo Client의 useQuery를 사용하여 fetchBoards GraphQL 쿼리를 실행합니다.
 *
 * @param variables - 쿼리 변수 (startDate, endDate, search, page)
 * @returns {Object} 쿼리 결과 객체
 * @returns {IFetchBoardsResponse | undefined} data - 게시글 목록 데이터
 * @returns {boolean} loading - 로딩 상태
 * @returns {Error | undefined} error - 에러 객체
 */
export function useFetchBoards(
  variables?: IFetchBoardsVariables
): IUseFetchBoardsReturn {
  const { data, loading, error } = useQuery<
    IFetchBoardsResponse,
    IFetchBoardsVariables
  >(FETCH_BOARDS, {
    variables,
  });

  return {
    data,
    loading,
    error: error as Error | undefined,
  };
}
