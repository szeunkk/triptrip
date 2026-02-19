"use client";

import Signup from "@/components/users/signup";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signup />
    </Suspense>
  );
}
