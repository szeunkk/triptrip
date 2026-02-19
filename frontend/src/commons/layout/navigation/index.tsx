"use client";

import styles from "./style.module.css";
import useNavigation from "./hook";
import Image from "next/image";
import Profile from "./profile";
import PointChargeModal from "./profile/modal";

export default function LayoutNavigation() {
  const {
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
  } = useNavigation();

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__tab}>
        <Image
          src="/icons/triptrip_logo.svg"
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ height: "2rem", width: "100%" }}
        ></Image>
        <div>
          <div className={pathname.startsWith("/boards") ? styles.selected : ""} onClick={onClickBoards}>
            트립토크
          </div>
          <div className={pathname.startsWith("/products") ? styles.selected : ""} onClick={onClickProducts}>
            숙박권 구매
          </div>
          <div>마이트립</div>
          <div className={pathname.startsWith("/mypage") ? styles.selected : ""} onClick={onClickMypage}>
            마이 페이지
          </div>
        </div>
      </div>
      {!data ? (
        <button className={styles.loginBtn} onClick={onClickLogin}>
          로그인
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.831 12L7.29826 4.46725C7.09959 4.26858 7.00284 4.03208 7.00801 3.75775C7.01318 3.48342 7.11509 3.24683 7.31376 3.048C7.51243 2.84933 7.74893 2.75 8.02326 2.75C8.29759 2.75 8.53418 2.84933 8.73301 3.048L16.3888 10.7193C16.5694 10.9001 16.7033 11.1027 16.7905 11.327C16.8778 11.5513 16.9215 11.7757 16.9215 12C16.9215 12.2243 16.8778 12.4487 16.7905 12.673C16.7033 12.8973 16.5694 13.0999 16.3888 13.2808L8.71751 20.952C8.51884 21.1507 8.28493 21.2474 8.01576 21.2423C7.74643 21.2371 7.51243 21.1352 7.31376 20.9365C7.11509 20.7378 7.01576 20.5013 7.01576 20.227C7.01576 19.9527 7.11509 19.7161 7.31376 19.5173L14.831 12Z"
              fill="white"
            />
          </svg>
        </button>
      ) : (
        <div style={{ position: "relative" }}>
          <div className={styles.navigation__user} onClick={onClickProfile}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="20" fill="#E4E4E4" />
              <path
                d="M20 19.4871C18.3958 19.4871 17.0226 18.916 15.8804 17.7738C14.7379 16.6313 14.1667 15.2579 14.1667 13.6538C14.1667 12.0496 14.7379 10.6764 15.8804 9.53418C17.0226 8.39168 18.3958 7.82043 20 7.82043C21.6042 7.82043 22.9774 8.39168 24.1196 9.53418C25.2621 10.6764 25.8333 12.0496 25.8333 13.6538C25.8333 15.2579 25.2621 16.6313 24.1196 17.7738C22.9774 18.916 21.6042 19.4871 20 19.4871ZM7.5 29.6475V28.4742C7.5 27.6581 7.72167 26.9022 8.165 26.2067C8.60833 25.5111 9.20083 24.9764 9.9425 24.6025C11.5897 23.795 13.2515 23.1893 14.9279 22.7854C16.6043 22.3815 18.295 22.1796 20 22.1796C21.705 22.1796 23.3957 22.3815 25.0721 22.7854C26.7485 23.1893 28.4103 23.795 30.0575 24.6025C30.7992 24.9764 31.3917 25.5111 31.835 26.2067C32.2783 26.9022 32.5 27.6581 32.5 28.4742V29.6475C32.5 30.3503 32.2538 30.9481 31.7613 31.4409C31.2688 31.9334 30.671 32.1796 29.9679 32.1796H10.0321C9.32903 32.1796 8.73125 31.9334 8.23875 31.4409C7.74625 30.9481 7.5 30.3503 7.5 29.6475ZM10 29.6796H30V28.4742C30 28.1367 29.9022 27.8242 29.7067 27.5367C29.5111 27.2495 29.2457 27.015 28.9104 26.8334C27.4743 26.1261 26.0101 25.5903 24.5179 25.2259C23.0254 24.8617 21.5194 24.6796 20 24.6796C18.4806 24.6796 16.9746 24.8617 15.4821 25.2259C13.9899 25.5903 12.5257 26.1261 11.0896 26.8334C10.7543 27.015 10.4889 27.2495 10.2933 27.5367C10.0978 27.8242 10 28.1367 10 28.4742V29.6796ZM20 16.9871C20.9167 16.9871 21.7014 16.6607 22.3542 16.0079C23.0069 15.3552 23.3333 14.5704 23.3333 13.6538C23.3333 12.7371 23.0069 11.9524 22.3542 11.2996C21.7014 10.6468 20.9167 10.3204 20 10.3204C19.0833 10.3204 18.2986 10.6468 17.6458 11.2996C16.9931 11.9524 16.6667 12.7371 16.6667 13.6538C16.6667 14.5704 16.9931 15.3552 17.6458 16.0079C18.2986 16.6607 19.0833 16.9871 20 16.9871Z"
                fill="#777777"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.5217 14.174L8.37047 11.023C8.32714 10.9795 8.29297 10.9309 8.26797 10.8773C8.24297 10.8238 8.23047 10.7663 8.23047 10.705C8.23047 10.5825 8.27189 10.476 8.35472 10.3855C8.43755 10.2952 8.54672 10.25 8.68222 10.25H15.3207C15.4562 10.25 15.5654 10.2957 15.6482 10.387C15.7311 10.4782 15.7725 10.5846 15.7725 10.7063C15.7725 10.7368 15.7257 10.8423 15.6322 11.023L12.4812 14.174C12.4089 14.2465 12.3341 14.2994 12.2567 14.3327C12.1794 14.3661 12.0943 14.3828 12.0015 14.3828C11.9086 14.3828 11.8236 14.3661 11.7462 14.3327C11.6689 14.2994 11.5941 14.2465 11.5217 14.174Z"
                fill="black"
              />
            </svg>
          </div>
          {isProfileOpen && data && (
            <Profile
              name={data.fetchUserLoggedIn.name}
              userPoint={data.fetchUserLoggedIn.userPoint}
              onLogout={onLogout}
              onPointCharge={onPointCharge}
              onClose={onClickProfile}
            />
          )}
        </div>
      )}
      <PointChargeModal isOpen={isModalOpen} onClose={onModalClose} onSubmit={onModalSubmit} />
    </div>
  );
}
