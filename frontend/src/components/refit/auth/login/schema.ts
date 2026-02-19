import z from "zod";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginUserFormValues = z.infer<typeof loginUserFormSchema>;

export const loginUserFormSchema = z.object({
  email: z.string().email("이메일 또는 비밀번호를 확인해주세요."),
  password: z.string().min(1, { message: "이메일 또는 비밀번호를 확인해주세요." }),
});
