import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "react-daum-postcode";
import { EditorState } from "lexical";
import { $getRoot } from "lexical";
import { productWriteSchema, ProductWriteFormValues } from "../schema";

export default function useProductWriteForm() {
  // 0. 세팅
  // 0-1. 라우터
  const router = useRouter();

  // 0-2. state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 0-3. ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. useForm 세팅
  // 1-1. useForm 초기값세팅
  const methods = useForm<ProductWriteFormValues>({
    defaultValues: {
      name: "",
      remarks: "",
      contents: "",
      price: "",
      tags: "",
      productAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
      lat: "",
      lng: "",
      images: [],
    },
    resolver: zodResolver(productWriteSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, setValue, watch } = methods;

  // 2. 함수
  // 2-1. 주소 검색 모달 토글
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 2-2. 주소 검색 완료 핸들러
  const handleComplete = async (data: Address) => {
    setValue("productAddress.zipcode", data.zonecode, { shouldValidate: true });
    setValue("productAddress.address", data.address, { shouldValidate: true });

    // Kakao API를 사용하여 주소를 좌표로 변환
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(data.address)}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}`,
          },
        }
      );

      const result = await response.json();

      if (result.documents && result.documents.length > 0) {
        const { x, y } = result.documents[0];
        setValue("lng", x, { shouldValidate: true }); // x는 경도(longitude)
        setValue("lat", y, { shouldValidate: true }); // y는 위도(latitude)
      }
    } catch (error) {
      const showErrorModal = () =>
        Modal.error({
          title: "좌표 변환에 실패하였습니다.",
          content: (error as string) ?? "좌표 변환에 실패하였습니다.",
        });
      showErrorModal();
    }

    setIsModalOpen(false);
  };

  // 2-3. Lexical 에디터 내용 변경 핸들러
  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      setValue("contents", textContent, { shouldValidate: true });
    });
  };

  // 2-4. 취소 버튼 핸들러
  const onClickCancel = () => {
    router.back();
  };

  // 2-5. 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // FileReader를 사용하여 이미지 미리보기 생성
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          setImagePreviews((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    // input 초기화
    event.target.value = "";
  };

  // 2-6. 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 2-7. 파일 선택 트리거
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    register,
    handleSubmit,
    formState,
    watch,
    setValue,
    isModalOpen,
    onToggleModal,
    handleComplete,
    handleEditorChange,
    onClickCancel,
    imageFiles,
    imagePreviews,
    handleImageUpload,
    handleImageRemove,
    fileInputRef,
    triggerFileInput,
  };
}

