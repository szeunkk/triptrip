import Image from "next/image";
import styles from "./styles.module.css";

export default function ProductsListBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.imageSection}>
          <Image
            src="/images/products_banner.png"
            alt="전시회 배너"
            width={584}
            height={240}
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.textSection}>
          <div className={styles.tags}>
            <span className={styles.tag}>&apos;솔로트립&apos; 독점 숙소</span>
            <span className={styles.tag}>9.24 얼리버드 오픈 예약</span>
          </div>
          <h2 className={styles.title}>
            천만 관객이 사랑한
            <br />
            빌 페소 르꼬 전시회 근처 숙소 특가 예약
          </h2>
        </div>
      </div>
    </div>
  );
}

