import { DeleteBoardDocument, FetchBoardsCountDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { formatInTimeZone } from "date-fns-tz";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { IListRow } from "./IListRow";

export default function useListRow(props: IListRow) {
  const router = useRouter();
  const onClickBoard = (event: MouseEvent<HTMLDivElement>) => {
    const boardId = event.currentTarget.id;
    // console.log(boardId)
    router.push(`/boards/${boardId}`);
  };

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const onClickDelete = async (event: MouseEvent<SVGSVGElement>) => {
    const parent = event.currentTarget.closest("div");
    const boardId = parent?.id || "";
    console.log("🚀 ~ onClickDelete ~ boardId:", boardId);
    event.stopPropagation();

    await deleteBoard({
      variables: {
        boardId,
      },
      refetchQueries: [{ query: FetchBoardsCountDocument }],
    });
    props.refetch({ page: props.currentPage });
    const showSuccessModal = () =>
      Modal.success({
        content: "게시글이 삭제되었습니다.",
      });
    showSuccessModal();
  };

  let KSTDate;
  if (props.createdAt) {
    KSTDate = formatInTimeZone(new Date(props.createdAt), "Asia/Seoul", "yyyy.MM.dd");
  }

  return { onClickBoard, onClickDelete, KSTDate };
}
