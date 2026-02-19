import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/graphql/graphql";

export default function useBoards() {
  // 게시글 리스트 요청 API 및 게시글 개수 요청 API
  const { data, fetchMore } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument);
  const [hasMore, setHasMore] = useState(true);

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoards.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards?.length) {
          setHasMore(false);
          return prev;
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return {
    data,
    hasMore,
    onNext,
  };
}
