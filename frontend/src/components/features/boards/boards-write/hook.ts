import {
  CreateBoardDocument,
  CreateBoardInput,
  FetchBoardQuery,
  UpdateBoardDocument,
  UpdateBoardInput,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import { Address } from "react-daum-postcode";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraphQLError } from "graphql";
import {
  boardCreateFormSchema,
  BoardCreateFormValues,
  boardUpdateFormSchema,
  BoardupdateFormValues,
} from "./schema";

/*
    CreateBoardInput

    boardAddress?: InputMaybe<BoardAddressInput>;
    contents: Scalars["String"]["input"];
    images?: InputMaybe<Array<Scalars["String"]["input"]>>;
    password?: InputMaybe<Scalars["String"]["input"]>;
    title: Scalars["String"]["input"];
    writer?: InputMaybe<Scalars["String"]["input"]>;
    youtubeUrl?: InputMaybe<Scalars["String"]["input"]>;

*/

export default function useBoardForm({ data, isEdit }: { data?: FetchBoardQuery; isEdit?: boolean }) {
  // 0. 세팅
  // 0-1. 라우터
  const router = useRouter();
  const params = useParams();

  // 1. useForm 세팅
  // 1-1. useForm 초기값세팅
  const methods = useForm<BoardCreateFormValues | BoardupdateFormValues>({
    defaultValues: {
      writer: "",
      password: "",
      title: "",
      contents: "",
      boardAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
      youtubeUrl: "",
      images: [undefined, undefined, undefined],
    },
    resolver: zodResolver(isEdit ? boardUpdateFormSchema : boardCreateFormSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, watch, reset, getValues } = methods;

  // 1-2. useForm 수정하기 페이지에서 data.fetchBoard 불러오기
  useEffect(() => {
    if (data?.fetchBoard) {
      reset({
        writer: data.fetchBoard.writer,
        title: data.fetchBoard.title,
        contents: data.fetchBoard.contents,
        boardAddress: {
          zipcode: data.fetchBoard.boardAddress?.zipcode,
          address: data.fetchBoard.boardAddress?.address,
          addressDetail: data.fetchBoard.boardAddress?.addressDetail,
        },
        images: data.fetchBoard.images,
        youtubeUrl: data.fetchBoard.youtubeUrl,
      });
    }
  }, [data, reset]);

  // 1-3. 모달 관련 state 설정
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 1-4. 게시글 생성 API 요청 함수
  const [createBoard] = useMutation(CreateBoardDocument);

  // 1-5. 게시글 수정 API 요청 함수
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // 1-6. 이미지 업로드 API 요청 함수
  const [uploadFile] = useMutation(UploadFileDocument);

  // 2. 함수
  // 2-1. 파일 변경 하기
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(watch("images"));
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files?.[0];

    // 파일 사이즈 유효성 검사
    if (file.size > 5 * 1024 * 1024) {
      const showErrorModal = () =>
        Modal.error({
          title: "파일 업로드에 실패하였습니다",
          content: "업로드 가능한 용량(5MB)을 초과하였습니다.",
        });
      showErrorModal();
      return;
    }

    // 파일 업로드 API
    const result = await uploadFile({
      variables: {
        file,
      },
    });

    console.log(result.data?.uploadFile.url);

    const fileUrl = result.data?.uploadFile.url;

    // 기존 값에서 변경: current(기존 createBoardInput), newImages(기존 이미지 배열 => 새로운 이미지 배열)
    // reset시, current로 얕은 복사를 안하면 다른 내용들이 초기화..!
    const current = getValues();
    const newImages = watch("images") ?? [];

    newImages[index] = fileUrl ?? "";
    reset({
      ...current,
      images: newImages,
    });
  };

  // 2-2. 파일 삭제 하기
  const onClickDelete = (index: number) => {
    const current = getValues();
    const newImages = watch("images") ?? [];

    newImages[index] = "";
    reset({
      ...current,
      images: newImages,
    });
  };

  // 2-3. 취소하기
  const onClickCancel = () => {
    router.back();
  };

  // 2-4. 주소 입력하기
  const handleComplete = (data: Address) => {
    const current = getValues();
    console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    reset({
      ...current,
      boardAddress: {
        zipcode: data.zonecode,
        address: data.address,
        addressDetail: data.buildingName,
      },
    });
    onToggleModal();
  };

  // 3. 등록, 수정하기 함수
  // 3-1. 등록하기
  const onClickSubmit = async (data: BoardCreateFormValues) => {
    console.log(data);
    const createBoardInput: CreateBoardInput = {
      ...data,
      images: data.images?.filter(Boolean) as string[],
      boardAddress: data.boardAddress,
    };

    console.log(createBoardInput);
    try {
      const result = await createBoard({ variables: { createBoardInput } });
      console.log("🚀 ~ onClickBtn ~ result:", result);
      const boardId = result.data?.createBoard._id;
      router.push(`/boards/${boardId}`);
    } catch (error) {
      const showErrorModal = () =>
        Modal.error({
          title: "에러가 발생하였습니다.",
          content: (error as string) ?? "에러가 발생하였습니다",
        });
      showErrorModal();
    }
  };

  // 3-2. 수정하기
  const onClickUpdate = async (formData: BoardupdateFormValues) => {
    const updateBoardInput: UpdateBoardInput = {};
    const boardId = params.boardId as string;
    // const values = getValues();
    if (formData.title !== data?.fetchBoard.title) updateBoardInput.title = formData.title;
    if (formData.contents !== data?.fetchBoard.contents) updateBoardInput.contents = formData.contents;
    if (formData.youtubeUrl !== data?.fetchBoard.youtubeUrl)
      updateBoardInput.youtubeUrl = formData.youtubeUrl;
    if (
      formData.boardAddress?.zipcode !== data?.fetchBoard.boardAddress?.zipcode ||
      formData.boardAddress?.address !== data?.fetchBoard.boardAddress?.address ||
      formData.boardAddress?.addressDetail !== data?.fetchBoard.boardAddress?.addressDetail
    ) {
      updateBoardInput.boardAddress = {
        zipcode: formData.boardAddress?.zipcode,
        address: formData.boardAddress?.address,
        addressDetail: formData.boardAddress?.addressDetail,
      };
    }
    const newImages = formData.images?.filter(Boolean);
    if (JSON.stringify(newImages) !== JSON.stringify(data?.fetchBoard.images)) {
      updateBoardInput.images = newImages as string[];
    }

    try {
      const password = prompt("글을 입력할 때 입력하셨던 비밀번호를 입력해주세요");
      const result = await updateBoard({
        variables: { updateBoardInput, password, boardId },
        // refetchQueries: [
        //   {
        //     query: FetchBoardDocument,
        //     variables: { boardId },
        //   },
        // ],
      });
      router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      const err = error as GraphQLError;
      Modal.error({
        title: "에러가 발생하였습니다.",
        content: (err.message as string) ?? "에러가 발생하였습니다",
      });
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    watch,
    onClickSubmit,
    isModalOpen,
    onToggleModal,
    onClickDelete,
    onChangeFile,
    onClickCancel,
    handleComplete,
    onClickUpdate,
  };
}
