import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  commentCreateFormSchema,
  CommentCreateFormValues,
  commentUpdateFormSchema,
  CommentUpdateFormValues,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import {
  CreateBoardCommentDocument,
  CreateBoardCommentInput,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";
import { BaseSyntheticEvent, useEffect } from "react";
import { Modal } from "antd";
import { GraphQLError } from "graphql";
import { IComment } from "../comment-list/types";

export default function useCommentForm({ el, onClickEdit }: { el?: IComment; onClickEdit?: () => void }) {
  // 0. 세팅
  const params = useParams();
  const boardId = String(params.boardId);

  // 1. useForm 세팅
  const methods = useForm<CommentCreateFormValues | CommentUpdateFormValues>({
    defaultValues: {
      writer: "",
      password: "",
      contents: "",
      rating: 3,
    },
    resolver: zodResolver(onClickEdit ? commentUpdateFormSchema : commentCreateFormSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, watch, setValue, reset } = methods;

  // 1-1. useEffect
  useEffect(() => {
    if (el) {
      reset({
        writer: el.writer,
        contents: el.contents,
        rating: el.rating,
      });
    }
  }, [el, reset]);

  // 2. API 요청 세팅
  // 2-1. 게시글 댓글 생성 API
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  // 2-2. 게시글 댓글 수정 API
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  // 3. 등록, 수정하기 함수
  // 3-1. 댓글 등록하기
  const onClickCommentSubmit = async (data: CommentCreateFormValues, event?: BaseSyntheticEvent) => {
    const createBoardCommentInput: CreateBoardCommentInput = { ...data };

    event?.preventDefault();
    try {
      await createBoardComment({
        variables: { createBoardCommentInput, boardId },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId },
          },
        ],
      });
      reset({
        writer: "",
        password: "",
        contents: "",
        rating: 3,
      });
    } catch (error) {
      const err = error as GraphQLError;
      Modal.error({
        title: "댓글 등록에 실패하였습니다.",
        content: err.message ?? "에러가 발생하였습니다",
      });
    }
  };

  // 3-2. 댓글 수정하기
  const onClickCommentEdit = async (data: CommentUpdateFormValues, event?: BaseSyntheticEvent) => {
    const updateBoardCommentInput = { contents: data.contents, rating: data.rating };
    const password = data.password;
    const boardCommentId: string = el?._id ?? "";
    event?.preventDefault();
    try {
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId,
        },
      });
      onClickEdit?.();
    } catch (error) {
      const err = error as GraphQLError;
      Modal.error({
        title: "댓글 수정에 실패하였습니다.",
        content: err.message ?? "에러가 발생하였습니다",
      });
    }
  };
  return {
    register,
    handleSubmit,
    formState,
    watch,
    setValue,
    onClickCommentSubmit,
    onClickCommentEdit,
  };
}
