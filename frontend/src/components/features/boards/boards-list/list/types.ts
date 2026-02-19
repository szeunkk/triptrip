import {
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export type BoardType = FetchBoardsQuery["fetchBoards"][0];

export interface IBoardsListProps {
  flex: string[];
  textAlign: CanvasTextAlign[];
  pageNum: Array<number | undefined>;
  currentPage: number;
  data: BoardType[];
  refetch: (
    variables?: Partial<FetchBoardsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
  search?: string;
}
