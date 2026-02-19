import { FETCH_BOARDS_OF_THE_BEST } from "@/graphql/queries/board";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Board } from "@/commons/graphql/graphql";

interface FetchBoardsOfTheBestQuery {
  fetchBoardsOfTheBest: Board[];
}

export default function useBoardsOfTheBest() {
  const router = useRouter();
  const { data } = useQuery<FetchBoardsOfTheBestQuery>(FETCH_BOARDS_OF_THE_BEST);

  const best = data?.fetchBoardsOfTheBest ?? [];

  const onClickBoards = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget?.id;
    router.push(`/fitfeed/${id}`);
  };
  return { best, onClickBoards };
}
