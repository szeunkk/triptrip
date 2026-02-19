"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./style.module.css";

export default function RefitNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isRemarket = pathname === "/remarket";
  const isFitfeed = pathname === "/fitfeed";

  return (
    <nav className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer} onClick={() => router.push("/remarket")}>
          <div className={styles.logoBox}>
            <span className={styles.logoText}>R</span>
          </div>
          <span className={styles.brandText}>Re:fit</span>
        </div>

        <div className={styles.navigation}>
          <button
            className={`${styles.navLink} ${isRemarket ? styles.active : ""}`}
            onClick={() => router.push("/remarket")}
          >
            Re: market
          </button>
          <button
            className={`${styles.navLink} ${isFitfeed ? styles.active : ""}`}
            onClick={() => router.push("/fitfeed")}
          >
            fit: feed
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconButton} onClick={() => router.push("/user/point")}>
          <div className={styles.icon}>
            <img src="/icons/point.svg" alt="지갑" />
          </div>
        </button>
        <button className={styles.iconButton} onClick={() => router.push("/user/login")}>
          <div className={styles.icon}>
            <img src="/icons/person.svg" alt="사용자" />
          </div>
        </button>
      </div>
    </nav>
  );
}
