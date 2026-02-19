"use client";

import { usePathname } from "next/navigation";
import { LayoutConfig } from "./type";
import RefitNav from "./refit_nav";

const defaultConfig: LayoutConfig = {
  navigation: true,
  banner: false,
};

const layoutConfig: Record<string, LayoutConfig> = {
  "/user/login": { navigation: false, banner: false },
  "/user/signup": { navigation: false, banner: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const config = layoutConfig[pathname] ?? defaultConfig;
  const showNavigation = config.navigation !== false;

  return (
    <>
      {showNavigation && <RefitNav />}
      {children}
    </>
  );
}
