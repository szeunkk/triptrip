"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/commons/components/input";
import Button from "@/commons/components/button";
import Pagination from "@/commons/components/pagination";

interface FormValues {
  email: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const onChangePage = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        variant="outlined"
        placeholder="이메일을 입력하세요"
        required
        error={errors.email?.message}
        {...register("email", {
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "유효한 이메일 형식이 아닙니다.",
          },
        })}
      />

      <Button type="submit">제출</Button>
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onChangePage}
      ></Pagination>
    </form>
  );
}
