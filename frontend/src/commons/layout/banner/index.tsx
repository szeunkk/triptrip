"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./style.module.css";

export default function LayoutBanner() {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          bulletActiveClass: styles.swiperPaginationBulletActive,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ width: "100%" }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/images/bannerimage${index + 1}.svg`}
              alt={`배너이미지${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "32rem", objectFit: "cover", objectPosition: "50% 70%" }}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
