import { usePathname } from "next/navigation";
import { getLayoutConfig } from "@/commons/constants/url";

/**
 * Area Visibility Hook
 * 현재 경로(pathname)에 따라 레이아웃 영역의 노출 여부를 반환하는 hook
 *
 * @returns {Object} 레이아웃 영역 노출 여부
 * @returns {boolean} shouldShowHeader - 헤더 영역 노출 여부
 * @returns {boolean} shouldShowLogo - 로고 노출 여부
 * @returns {boolean} shouldShowBanner - 배너 영역 노출 여부
 * @returns {boolean} shouldShowHeroImage - 히어로 이미지 노출 여부
 */
export function useAreaVisibility() {
  const pathname = usePathname();

  // url.ts의 메타데이터를 기반으로 레이아웃 구성 정보 가져오기
  const layoutConfig = getLayoutConfig(pathname);

  return {
    shouldShowHeader: layoutConfig.header.visible,
    shouldShowLogo: layoutConfig.header.logo,
    shouldShowBanner: layoutConfig.banner,
    shouldShowHeroImage: layoutConfig.heroimage,
  };
}
