import { gql, useQuery } from "@apollo/client";

// GraphQL 쿼리 정의
const FETCH_BOARDS_OF_THE_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      likeCount
      createdAt
      images
    }
  }
`;

// 타입 정의
export interface IBoardOfTheBest {
  _id: string;
  writer: string;
  title: string;
  likeCount: number;
  createdAt: string;
  images: string[];
}

export interface IFetchBoardsOfTheBestResponse {
  fetchBoardsOfTheBest: IBoardOfTheBest[];
}

export interface IUseFetchBoardsOfTheBestReturn {
  data: IFetchBoardsOfTheBestResponse | undefined;
  loading: boolean;
  error: Error | undefined;
}

/**
 * 베스트 게시글 목록을 가져오는 훅
 * Apollo Client의 useQuery를 사용하여 fetchBoardsOfTheBest GraphQL 쿼리를 실행합니다.
 *
 * @returns {Object} 쿼리 결과 객체
 * @returns {IFetchBoardsOfTheBestResponse | undefined} data - 베스트 게시글 목록 데이터
 * @returns {boolean} loading - 로딩 상태
 * @returns {Error | undefined} error - 에러 객체
 */
export function useFetchBoardsOfTheBest(): IUseFetchBoardsOfTheBestReturn {
  const { data, loading, error } = useQuery<IFetchBoardsOfTheBestResponse>(
    FETCH_BOARDS_OF_THE_BEST
  );

  return {
    data,
    loading,
    error: error as Error | undefined,
  };
}
