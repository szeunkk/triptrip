import z from "zod";

export type CommentFormValues = {
  writer?: string | null;
  password?: string | null;
  contents: string;
  rating: number;
};

export type CommentCreateFormValues = z.infer<typeof commentCreateFormSchema>;
export type CommentUpdateFormValues = z.infer<typeof commentUpdateFormSchema>;

export const commentCreateFormSchema = z.object({
  writer: z.string().min(1, { message: "작성자를 입력해주세요." }).optional().nullable(),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자리~16자리로 작성해주세요." })
    .max(16, { message: "비밀번호는 8자리~16자리로 작성해주세요." })
    .optional()
    .nullable(),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  rating: z.number(),
});

export const commentUpdateFormSchema = z.object({
  writer: z.string().optional().nullable(),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  rating: z.number(),
  password: z.string().optional().nullable(),
});
