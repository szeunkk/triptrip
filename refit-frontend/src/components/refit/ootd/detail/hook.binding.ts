import { DislikeBoardDocument, FetchBoardDocument, LikeBoardDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
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
    createdAt: createdAt,
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
