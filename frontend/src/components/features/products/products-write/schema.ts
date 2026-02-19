import { z } from "zod";

// 상품 등록 form 스키마
export const productWriteSchema = z.object({
  name: z.string().min(1, "상품명을 입력해 주세요."),
  remarks: z.string().min(1, "한줄 요약을 입력해 주세요."),
  contents: z.string().min(1, "상품 설명을 입력해 주세요."),
  price: z.string().min(1, "판매 가격을 입력해 주세요."),
  tags: z.string().optional(),
  productAddress: z.object({
    zipcode: z.string().min(1, "우편번호를 입력해 주세요."),
    address: z.string().min(1, "주소를 입력해 주세요."),
    addressDetail: z.string().optional(),
  }),
  lat: z.string().optional(),
  lng: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type ProductWriteFormValues = z.infer<typeof productWriteSchema>;

