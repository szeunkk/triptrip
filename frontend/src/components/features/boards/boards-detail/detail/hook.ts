import { DislikeBoardDocument, FetchBoardDocument, LikeBoardDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { formatInTimeZone } from "date-fns-tz";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function useBoardsDetail() {
  const router = useRouter();

  const params = useParams();
  const boardId = params.boardId;

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: boardId as string,
    },
  });

  const { writer, title, contents, youtubeUrl, images, createdAt, boardAddress } = data?.fetchBoard || {};

  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [dislikeCount, setDislikeCount] = useState<number | null>(null);

  const likeValue = likeCount ?? data?.fetchBoard.likeCount;
  const dislikeValue = dislikeCount ?? data?.fetchBoard.dislikeCount;

  const [likeBoard] = useMutation(LikeBoardDocument);
  const [dislikeBoard] = useMutation(DislikeBoardDocument);

  const onClickLikeBoard = async () => {
    try {
      const result = await likeBoard({
        variables: {
          boardId: boardId as string,
        },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: { boardId: boardId },
          },
        ],
      });
      console.log("🚀 ~ onClickLikeBoard ~ result.likeBoard:", result?.data?.likeBoard);
      const count = result?.data?.likeBoard as number;
      setLikeCount(count);
    } catch (error) {
      const showErrorModal = () =>
        Modal.error({
          title: "에러가 발생하였습니다.",
          content: (error as string) ?? "에러가 발생하였습니다",
        });
      showErrorModal();
    }
  };

  const onClickdislikeBoard = async () => {
    try {
      const result = await dislikeBoard({
        variables: {
          boardId: boardId as string,
        },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: { boardId: boardId },
          },
        ],
      });
      console.log("🚀 ~ onClickdislikeBoard ~ result.dislikeBoard:", result?.data?.dislikeBoard);
      const count = result?.data?.dislikeBoard as number;
      setDislikeCount(count);
    } catch (error) {
      const showErrorModal = () =>
        Modal.error({
          title: "에러가 발생하였습니다.",
          content: (error as string) ?? "에러가 발생하였습니다",
        });
      showErrorModal();
    }
  };

  // const date = createdAt?.slice(0,10)
  // 현재 createdAt에 저장된 시간은 UTC로 기존 코드 그대로 사용 시, 새벽시간대 작성하거나 UTC날짜가 바뀌는 시간대에 작성 시 날짜가 이상하게 나옴
  // 한국 시간대로 변경 필요: 외부 라이브러리 date-fns-tz 설치 후 서울 시간대로 변경
  let KSTdate;
  if (createdAt) {
    KSTdate = formatInTimeZone(new Date(createdAt), "Asia/Seoul", "yyyy-MM-dd");
  }
  const onClickBoardsList = () => {
    router.push("/boards");
  };

  const onClickBoardsEdit = () => {
    router.push(`/boards/${boardId}/edit`);
  };

  const imagesUrl = images?.filter(Boolean).map((el: string) => `https://storage.googleapis.com/${el}`);

  return {
    writer: writer,
    title: title,
    contents: contents,
    youtubeUrl: youtubeUrl,
    imagesUrl: imagesUrl,
    KSTdate: KSTdate,
    likeCount: likeCount,
    dislikeCount: dislikeCount,
    onClickBoardsList,
    onClickBoardsEdit,
    boardAddress,
    onClickLikeBoard,
    likeValue,
    onClickdislikeBoard,
    dislikeValue,
  };
}
