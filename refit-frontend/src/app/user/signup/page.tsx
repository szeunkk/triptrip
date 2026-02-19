import { Suspense } from "react";
import SignupPage from "@/components/refit/auth/signup";

export default function Signup() {
  return (
    <Suspense fallback={null}>
      <SignupPage />
    </Suspense>
  );
}
