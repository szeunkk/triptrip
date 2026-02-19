"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MypageUser from "@/components/mypage/user";
import MypageProduct from "@/components/mypage/product";
import MypagePoint from "@/components/mypage/point";
import MypagePassword from "@/components/mypage/password";
import Sectiontitle from "@/components/ui/section/Sectiontitle";
import styles from "./styles.module.css";

type TabType = "product" | "point" | "password";

export default withAuth(function MyPagePage({ isAuth }: { isAuth?: boolean }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("product");

  useEffect(() => {
    if (isAuth === false) {
      console.log(isAuth);
      Modal.error({
        title: "해당 페이지에 접속 권한이 없습니다.",
        content: "로그인 후 이용해주세요.",
      });
      router.push("/login");
    }
  }, [isAuth, router]);

  if (isAuth === false) return null;

  return (
    <div className={styles.mypage}>
      <Sectiontitle text="마이 페이지"></Sectiontitle>
      <MypageUser activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "product" && <MypageProduct />}
      {activeTab === "point" && <MypagePoint />}
      {activeTab === "password" && <MypagePassword />}
    </div>
  );
});
