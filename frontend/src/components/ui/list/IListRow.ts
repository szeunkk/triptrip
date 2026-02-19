import { FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IListRow {
  _id: string;
  flex: string[];
  createdAt: string;
  textAlign: CanvasTextAlign[];
  num: number | undefined;
  title: string;
  writer: string;
  currentPage: number;
  children?: React.ReactNode;
  refetch: (variables?: Partial<FetchBoardsQueryVariables>) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
  search?: string;
}
