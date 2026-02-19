import z from "zod";

export type SignupFormValues = {
  email: string;
  name: string;
  password: string;
};

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export const createUserFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해 주세요." })
      .email("유효한 이메일 주소를 입력해주세요"),
    name: z.string().min(1, { message: "이름을 입력해 주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상 입력해 주세요." })
      .max(16, { message: "비밀번호는 16자 이하로 입력해 주세요." })
      .regex(/[a-z]/, { message: "비밀번호는 영대/소문자, 숫자가 포함되어야 합니다." })
      .regex(/[A-Z]/, { message: "비밀번호는 영대/소문자, 숫자가 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 영대/소문자, 숫자가 포함되어야 합니다." }),
    passwordConfirm: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상 입력해 주세요." })
      .max(16, { message: "비밀번호는 16자 이하로 입력해 주세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
