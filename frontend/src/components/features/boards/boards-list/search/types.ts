import {
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface ISearchBar {
  endDate: string | undefined;
  startDate: string | undefined;
  search: string;
  setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: (
    variables?: Partial<FetchBoardsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
