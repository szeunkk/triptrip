import { FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IPaginationProps{
    lastPage: number,
    refetch: (variables?: Partial<FetchBoardsQueryVariables>) => Promise<ApolloQueryResult<FetchBoardsQuery>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number,
    numPerPageGroup: number
}