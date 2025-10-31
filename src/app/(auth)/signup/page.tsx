import { Signup } from "@/components/signup";

// useSearchParams를 사용하므로 dynamic rendering 필요
export const dynamic = "force-dynamic";

export default function SignupPage() {
  return <Signup />;
}
