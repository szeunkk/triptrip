"use client";

import React, { ReactNode } from "react";
import styles from "./styles.module.css";

// Layout Props 타입
export interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 * 전체 페이지 레이아웃 구조를 제공하는 컴포넌트입니다.
 * Header, Banner, Gap, Main(Children) 영역으로 구성됩니다.
 *
 * @param children - 메인 콘텐츠 영역에 렌더링될 React 노드
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Header</header>
      <div className={styles.banner}>Banner</div>
      <div className={styles.gap}></div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
