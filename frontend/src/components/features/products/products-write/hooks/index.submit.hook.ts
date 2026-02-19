import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { CREATE_TRAVELPRODUCT } from "@/graphql/mutations/product";
import { UPLOAD_FILE } from "@/graphql/queries/file";
import { ProductWriteFormValues } from "../schema";

interface UseProductWriteFormSubmitReturn {
  onSubmit: (data: ProductWriteFormValues, imageFiles: File[]) => Promise<void>;
  data: unknown;
  loading: boolean;
  error: unknown;
}

export default function useProductWriteFormSubmit(): UseProductWriteFormSubmitReturn {
  // 0. 세팅
  // 0-1. 라우터
  const router = useRouter();

  // 1. API 요청 세팅
  // 1-1. 상품 등록 API
  const [createTravelproduct, { data, loading, error }] = useMutation(CREATE_TRAVELPRODUCT);
  // 1-2. 파일 업로드 API
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 2. 등록하기 함수
  // 2-1. 상품 등록하기
  const onSubmit = async (formData: ProductWriteFormValues, imageFiles: File[]) => {
    try {
      // tags를 배열로 변환 (쉼표로 구분)
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];

      // price를 숫자로 변환
      const priceNumber = parseInt(formData.price, 10);

      // lat, lng 값 추출
      const lat = formData.lat ? parseFloat(formData.lat) : undefined;
      const lng = formData.lng ? parseFloat(formData.lng) : undefined;

      // travelproductAddress 구조 생성
      const travelproductAddress = {
        address: formData.productAddress.address,
        addressDetail: formData.productAddress.addressDetail || "",
        zipcode: formData.productAddress.zipcode,
        lat,
        lng,
      };

      // 이미지 파일 업로드 및 URL 수집
      const imageUrls: string[] = [];
      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          try {
            const uploadResult = await uploadFile({
              variables: { file },
            });
            if (uploadResult.data?.uploadFile?.url) {
              imageUrls.push(uploadResult.data.uploadFile.url);
            }
          } catch (uploadError) {
            console.error("이미지 업로드 실패:", uploadError);
            // 개별 이미지 업로드 실패 시에도 계속 진행
          }
        }
      }

      // GraphQL mutation 실행
      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: formData.name,
            remarks: formData.remarks,
            contents: formData.contents,
            price: priceNumber,
            tags: tagsArray.length > 0 ? tagsArray : undefined,
            travelproductAddress,
            images: imageUrls.length > 0 ? imageUrls : undefined,
          },
        },
      });

      // 성공 시 상세 페이지로 이동
      if (result.data?.createTravelproduct?._id) {
        const productId = result.data.createTravelproduct._id;
        router.push(`/products/${productId}`);
      }
    } catch (err) {
      // 에러 처리
      const showErrorModal = () =>
        Modal.error({
          title: "상품 등록에 실패하였습니다.",
          content: (err as Error)?.message ?? "상품 등록에 실패하였습니다.",
        });
      showErrorModal();
    }
  };

  return {
    onSubmit,
    data,
    loading,
    error,
  };
}

