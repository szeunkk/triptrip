import { FETCH_BOARDS_OF_THE_BEST } from "@/graphql/queries/board";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function useBoardsOfTheBest() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS_OF_THE_BEST);

  const best = data?.fetchBoardsOfTheBest;

  const onClickBoards = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget?.id;
    router.push(`/boards/${id}`);
  };
  return { best, onClickBoards };
}
