"use client";

import { usePathname, useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import { Modal } from "antd";

interface AuthProps {
  isAuth?: boolean;
  handleUnauthClick?: (content: string) => void;
}

export const withAuth = <P extends object>(Component: ComponentType<P & AuthProps>) => {
  const WrappedComponent = (props: Omit<P, keyof AuthProps>) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) return setIsAuth(false);
      if (token) return setIsAuth(true);
    }, []);

    const handleUnauthClick = (content: string) => {
      Modal.confirm({
        title: "로그인 후 이용할 수 있습니다.",
        content: content || "해당 기능은 로그인 후 이용할 수 있습니다.",
        okText: "로그인하기",
        cancelText: "창닫기",
        onOk() {
          router.push(`/login?redirect=${pathname}`);
        },
        onCancel() {},
      });
    };

    return <Component {...(props as P)} isAuth={isAuth} handleUnauthClick={handleUnauthClick} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
