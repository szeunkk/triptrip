"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

// Provider Props 타입
interface ReactQueryProviderProps {
  children: ReactNode;
}

/**
 * React Query Provider
 * @tanstack/react-query를 사용하여 전역 캐시를 관리합니다.
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터가 stale 상태로 변하는 시간 (ms)
            staleTime: 60 * 1000, // 1분
            // 캐시된 데이터가 유지되는 시간 (ms)
            gcTime: 5 * 60 * 1000, // 5분 (기존 cacheTime)
            // 에러 발생 시 재시도 횟수
            retry: 1,
            // 윈도우 포커스 시 자동 refetch 비활성화
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
