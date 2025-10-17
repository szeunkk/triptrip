import Input from "@/commons/components/input";

export default function Home() {
  return (
    <>
      {/* 기본 사용 */}
      <Input label="이메일" placeholder="이메일을 입력하세요" />
      {/* Medium + Required */}
      <Input size="medium" label="비밀번호" required type="password" />
      {/* Small + Error */}
      <Input
        size="small"
        label="전화번호"
        error="올바른 전화번호를 입력해주세요"
      />
      {/* Filled Variant */}
      <Input variant="filled" label="주소" />
      {/* Read Only */}
      <Input label="이름" value="홍길동" readOnly />
      {/* Disabled */}
      <Input label="닉네임" disabled />
    </>
  );
}
