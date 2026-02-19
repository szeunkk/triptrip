import z from "zod";

export type BoardFormValues = {
  title: string;
  contents: string;
  writer?: string | null;
  password?: string | null;
  youtubeUrl?: string | null;
  boardAddress?: {
    zipcode?: string | null;
    address?: string | null;
    addressDetail?: string | null;
  } | null;
  images?: (string | null)[] | null;
};

export type BoardCreateFormValues = z.infer<typeof boardCreateFormSchema>;
export type BoardupdateFormValues = z.infer<typeof boardUpdateFormSchema>;
export const boardCreateFormSchema = z.object({
  writer: z.string().min(1, { message: "작성자를 입력해주세요." }).optional().nullable(),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자리~16자리로 작성해주세요." })
    .max(16, { message: "비밀번호는 8자리~16자리로 작성해주세요." })
    .optional()
    .nullable(),
  title: z.string().min(2, { message: "제목은 2자 이상 입력해 주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  youtubeUrl: z.string().optional().nullable(),
  boardAddress: z
    .object({
      zipcode: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      addressDetail: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  images: z.array(z.string().optional()).max(3).optional().nullable(),
});

export const boardUpdateFormSchema = z.object({
  writer: z.string().optional().nullable(),
  title: z.string().min(2, { message: "제목은 2자 이상 입력해 주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  youtubeUrl: z.string().optional().nullable(),
  boardAddress: z
    .object({
      zipcode: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      addressDetail: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  images: z.array(z.string().optional()).max(3).optional().nullable(),
});
