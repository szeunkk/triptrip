import { FETCH_USER_LOGGED_IN } from "@/graphql/queries/login";
import { useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function useNavigation() {
  const router = useRouter();

  const pathname = usePathname();

  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickBoards = () => {
    router.push("/boards");
  };
  const onClickLogin = () => {
    router.push(`/login?redirect=${pathname}`);
  };

  const onClickMypage = () => {
    router.push("/mypage");
  };

  const onClickProducts = () => {
    router.push("/products");
  };

  const onClickProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const onLogout = () => {
    // TODO: 로그아웃 로직 구현
    console.log("로그아웃");
  };

  const onPointCharge = () => {
    setIsModalOpen(true);
    setIsProfileOpen(false);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalSubmit = (amount: number) => {
    // TODO: 포인트 충전 로직 구현
    console.log("포인트 충전:", amount);
  };

  return {
    onClickBoards,
    onClickLogin,
    onClickMypage,
    onClickProducts,
    onClickProfile,
    onLogout,
    onPointCharge,
    onModalClose,
    onModalSubmit,
    data,
    pathname,
    isProfileOpen,
    isModalOpen,
  };
}
