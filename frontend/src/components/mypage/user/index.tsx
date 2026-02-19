import Image from "next/image";
import styles from "./styles.module.css";

type TabType = "product" | "point" | "password";

interface MypageUserProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function MypageUser({ activeTab, onTabChange }: MypageUserProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 정보</h2>

      <div className={styles.profile}>
        <div className={styles.profileContent}>
          <Image
            src="/images/profile/7.svg"
            alt="프로필"
            width={40}
            height={40}
            className={styles.profileImage}
          />
          <span className={styles.profileName}>김상훈</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.point}>
        <Image src="/icons/point.svg" alt="포인트" width={24} height={24} className={styles.pointIcon} />
        <div className={styles.pointValue}>
          <span className={styles.pointAmount}>23,000</span>
          <span className={styles.pointUnit}>P</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.menuList}>
        <button
          className={styles.menuItem}
          data-active={activeTab === "product"}
          onClick={() => onTabChange("product")}
        >
          <span className={styles.menuText}>거래내역&북마크</span>
          <Image
            src="/icons/right_arrow.svg"
            alt="이동"
            width={20}
            height={20}
            className={styles.menuArrow}
          />
        </button>

        <button
          className={styles.menuItem}
          data-active={activeTab === "point"}
          onClick={() => onTabChange("point")}
        >
          <span className={styles.menuText}>포인트 사용 내역</span>
          <Image
            src="/icons/right_arrow.svg"
            alt="이동"
            width={20}
            height={20}
            className={styles.menuArrow}
          />
        </button>

        <button
          className={styles.menuItem}
          data-active={activeTab === "password"}
          onClick={() => onTabChange("password")}
        >
          <span className={styles.menuText}>비밀번호 변경</span>
          <Image
            src="/icons/right_arrow.svg"
            alt="이동"
            width={20}
            height={20}
            className={styles.menuArrow}
          />
        </button>
      </div>
    </div>
  );
}
