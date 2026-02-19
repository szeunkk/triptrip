import { FetchBoardCommentsDocument, FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useCommentList() {
  const params = useParams();
  const boardId = params.boardId;
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchMore } = useQuery<FetchBoardCommentsQuery>(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId,
    },
    // fetchPolicy: "cache-and-network",
  });

  if (!boardId)
    return {
      fetchBoardComments: [],
      hasMore: false,
      onNext: () => {},
    };

  if (data === undefined)
    return {
      fetchBoardComments: [],
      hasMore: false,
      onNext: () => {},
    };

  const onNext = () => {
    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
        boardId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        }

        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        };
      },
    });
  };

  const fetchBoardComments = data?.fetchBoardComments;

  return { fetchBoardComments, hasMore, onNext };
}
