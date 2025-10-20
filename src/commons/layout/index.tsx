"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/commons/components/button";
import "swiper/css";
import "swiper/css/pagination";
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
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          {/* Logo & Navigation Area */}
          <div className={styles.headerLeft}>
            {/* Logo */}
            <div className={styles.logoArea}>
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={51.52}
                height={32}
                priority
              />
            </div>
            {/* Navigation Tabs */}
            <nav className={styles.tabArea}>
              <div className={`${styles.tab} ${styles.tabActive}`}>
                <span>트립토크</span>
              </div>
              <div className={styles.tab}>
                <span>숙박권 구매</span>
              </div>
              <div className={styles.tab}>
                <span>마이 페이지</span>
              </div>
            </nav>
          </div>
          {/* Login Button Area */}
          <div className={styles.headerRight}>
            <Button
              variant="secondary"
              size="small"
              shape="pill"
              className={styles.loginButton}
            >
              <span>로그인</span>
              <Image
                src="/icons/right_icon.svg"
                alt=""
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <div className={styles.banner}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: styles.swiperPaginationBulletActive,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className={styles.swiperContainer}
        >
          <SwiperSlide>
            <Image
              src="/images/banner1.jpg"
              alt="Banner 1"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/banner2.jpg"
              alt="Banner 2"
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/banner3.jpg"
              alt="Banner 3"
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.gap}></div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
