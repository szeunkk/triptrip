import { useRouter, usePathname } from "next/navigation";
import { url } from "@/commons/constants/url";

/**
 * Layout Link Routing Hook
 * Layout 컴포넌트에서 사용되는 페이지 이동 및 active 상태 관리 기능을 제공합니다.
 *
 * @returns handleLogoClick - 로고 클릭 핸들러 (게시글 목록 페이지로 이동)
 * @returns handleBoardsClick - 트립토크 탭 클릭 핸들러 (게시글 목록 페이지로 이동)
 * @returns handleProductsClick - 숙박권 구매 탭 클릭 핸들러 (숙박권 목록 페이지로 이동)
 * @returns handleMypageClick - 마이페이지 탭 클릭 핸들러 (마이페이지로 이동)
 * @returns isBoardsActive - 현재 경로가 게시글 관련 페이지인지 여부
 * @returns isProductsActive - 현재 경로가 숙박권 관련 페이지인지 여부
 * @returns isMypageActive - 현재 경로가 마이페이지인지 여부
 */
export function useLinkRouting() {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 로고 클릭 핸들러
   * 게시글 목록 페이지로 이동
   */
  const handleLogoClick = () => {
    router.push(url.boards.list.path);
  };

  /**
   * 트립토크 탭 클릭 핸들러
   * 게시글 목록 페이지로 이동
   */
  const handleBoardsClick = () => {
    router.push(url.boards.list.path);
  };

  /**
   * 숙박권 구매 탭 클릭 핸들러
   * 숙박권 목록 페이지로 이동
   */
  const handleProductsClick = () => {
    router.push(url.products.list.path);
  };

  /**
   * 마이페이지 탭 클릭 핸들러
   * 마이페이지로 이동
   */
  const handleMypageClick = () => {
    router.push(url.mypage.main.path);
  };

  /**
   * 현재 경로가 게시글 관련 페이지인지 확인
   */
  const isBoardsActive = pathname.startsWith("/boards");

  /**
   * 현재 경로가 숙박권 관련 페이지인지 확인
   */
  const isProductsActive = pathname.startsWith("/products");

  /**
   * 현재 경로가 마이페이지인지 확인
   */
  const isMypageActive = pathname.startsWith("/mypage");

  return {
    handleLogoClick,
    handleBoardsClick,
    handleProductsClick,
    handleMypageClick,
    isBoardsActive,
    isProductsActive,
    isMypageActive,
  };
}
