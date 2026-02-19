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
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Modal } from "antd";
import { GraphQLError } from "graphql";

export interface IComment {
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
}

export default function useCommentForm() {
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
    resolver: zodResolver(commentCreateFormSchema),
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rating: 0,
    content: "",
  });

  const { register, handleSubmit: handleCommentSubmit, formState, watch, setValue, reset } = methods;

  // 2. API 요청 세팅
  // 2-1. 게시글 댓글 생성 API
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  // 2-2. 게시글 댓글 수정 API
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setFormData({ username: "", password: "", rating: 0, content: "" });
  };

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

      handleModalClose();
    } catch (error) {
      const err = error as GraphQLError;
      Modal.error({
        title: "댓글 등록에 실패하였습니다.",
        content: err.message ?? "에러가 발생하였습니다",
      });
    }
  };

  return {
    register,
    handleCommentSubmit,
    formState,
    watch,
    setValue,
    onClickCommentSubmit,
    handleModalOpen,
    handleModalClose,
    isModalOpen,
  };
}
