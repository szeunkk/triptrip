import Login from "@/components/login";

// useSearchParams를 사용하므로 dynamic rendering 필요
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <Login />;
}
