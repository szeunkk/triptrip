"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@commons/ui";
import styles from "./styles.module.css";
import { usePortonePayment } from "./portone";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { COLORS } from "@/commons/constants/colors";

interface PointChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const POINT_OPTIONS = [100, 500, 2000, 5000, 10000, 50000];

type ModalView = "form" | "success" | "failed";

export default function PointChargeModal({ isOpen, onClose, onSubmit }: PointChargeModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [modalView, setModalView] = useState<ModalView>("form");
  const [errorMessage, setErrorMessage] = useState("");

  const { requestPayment, loading } = usePortonePayment(
    () => {
      setModalView("success");
    },
    (message) => {
      setErrorMessage(message);
      setModalView("failed");
    }
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setModalView("form");
      setSelectedAmount(null);
      setIsDropdownOpen(false);
      setErrorMessage("");
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (selectedAmount) {
      await requestPayment(selectedAmount);
    }
  };

  const handleCancel = () => {
    setSelectedAmount(null);
    setIsDropdownOpen(false);
    onClose();
  };

  const handleSuccessConfirm = () => {
    onSubmit(selectedAmount || 0);
    onClose();
    // 페이지 새로고침으로 포인트 업데이트 반영
    window.location.reload();
  };

  const handleFailedRetry = () => {
    setModalView("form");
    setErrorMessage("");
  };

  const handleFailedClose = () => {
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} data-testid="modal-backdrop">
      <div className={styles.popup} data-testid="modal-popup">
        <div className={styles.popup__content}>
          {modalView === "form" && (
            <>
              <div className={styles.popup__header}>
                <svg
                  width="80"
                  height="56"
                  viewBox="0 0 80 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.popup__icon}
                >
                  <path
                    d="M18.5826 2.21463C18.2964 2.50079 18.2964 2.96476 18.5826 3.25093L20.1371 4.80544L18.5825 6.36004C18.2963 6.64621 18.2963 7.11018 18.5825 7.39635C18.8687 7.68252 19.3326 7.68252 19.6188 7.39635L21.1734 5.84175L22.7278 7.39616C23.014 7.68233 23.478 7.68233 23.7641 7.39616C24.0503 7.10999 24.0503 6.64602 23.7641 6.35985L22.2097 4.80544L23.764 3.25113C24.0502 2.96496 24.0502 2.50099 23.764 2.21482C23.4779 1.92865 23.0139 1.92865 22.7277 2.21482L21.1734 3.76914L19.6189 2.21463C19.3327 1.92846 18.8688 1.92846 18.5826 2.21463Z"
                    fill="var(--color-gray-black)"
                  />
                  <path
                    d="M72.5693 14.1781C72.3904 14.357 72.3904 14.6469 72.5693 14.8258L73.5408 15.7973L72.5694 16.7688C72.3905 16.9476 72.3905 17.2376 72.5694 17.4165C72.7482 17.5953 73.0382 17.5953 73.2171 17.4165L74.1885 16.445L75.16 17.4166C75.3389 17.5954 75.6289 17.5954 75.8077 17.4166C75.9866 17.2377 75.9866 16.9477 75.8077 16.7689L74.8362 15.7973L75.8078 14.8257C75.9867 14.6468 75.9867 14.3569 75.8078 14.178C75.629 13.9991 75.339 13.9991 75.1601 14.178L74.1885 15.1496L73.217 14.1781C73.0381 13.9992 72.7481 13.9992 72.5693 14.1781Z"
                    fill="var(--color-gray-black)"
                  />
                  <path
                    d="M13.1099 48.7723C12.8211 48.7723 12.5871 49.0063 12.5871 49.2951V50.8633H11.0186C10.7299 50.8633 10.4958 51.0974 10.4958 51.3861C10.4958 51.6748 10.7299 51.9089 11.0186 51.9089H12.5871V53.4772C12.5871 53.7659 12.8211 54 13.1099 54C13.3986 54 13.6326 53.7659 13.6326 53.4772V51.9089H15.2008C15.4895 51.9089 15.7236 51.6748 15.7236 51.3861C15.7236 51.0974 15.4895 50.8633 15.2008 50.8633H13.6326V49.2951C13.6326 49.0063 13.3986 48.7723 13.1099 48.7723Z"
                    fill="var(--color-gray-black)"
                  />
                  <path
                    d="M7.74792 21.7511C7.74792 22.5099 7.13278 23.125 6.37396 23.125C5.61514 23.125 5 22.5099 5 21.7511C5 20.9922 5.61514 20.3771 6.37396 20.3771C7.13278 20.3771 7.74792 20.9922 7.74792 21.7511Z"
                    fill="var(--color-gray-black)"
                  />
                  <path
                    d="M75.53 42.8185C75.53 43.5773 74.9149 44.1924 74.156 44.1924C73.3972 44.1924 72.7821 43.5773 72.7821 42.8185C72.7821 42.0596 73.3972 41.4445 74.156 41.4445C74.9149 41.4445 75.53 42.0596 75.53 42.8185Z"
                    fill="var(--color-gray-black)"
                  />
                  <path
                    d="M25.9031 49.3925C24.6851 49.3925 23.6446 48.9612 22.7815 48.0985C21.9189 47.2355 21.4875 46.1949 21.4875 44.9769V12.2839C21.4875 11.0659 21.9189 10.0253 22.7815 9.16229C23.6446 8.29965 24.6851 7.86832 25.9031 7.86832H58.5961C59.8141 7.86832 60.8547 8.29965 61.7177 9.16229C62.5804 10.0253 63.0117 11.0659 63.0117 12.2839V18.9308H59.3478V12.2839C59.3478 12.0645 59.2774 11.8844 59.1365 11.7435C58.9957 11.6026 58.8155 11.5322 58.5961 11.5322H25.9031C25.6837 11.5322 25.5036 11.6026 25.3627 11.7435C25.2219 11.8844 25.1514 12.0645 25.1514 12.2839V44.9769C25.1514 45.1963 25.2219 45.3764 25.3627 45.5173C25.5036 45.6582 25.6837 45.7286 25.9031 45.7286H58.5961C58.8155 45.7286 58.9957 45.6582 59.1365 45.5173C59.2774 45.3764 59.3478 45.1963 59.3478 44.9769V38.33H63.0117V44.9769C63.0117 46.1949 62.5804 47.2355 61.7177 48.0985C60.8547 48.9612 59.8141 49.3925 58.5961 49.3925H25.9031ZM45.4439 39.6221C44.2259 39.6221 43.1853 39.1908 42.3223 38.3281C41.4596 37.4651 41.0283 36.4245 41.0283 35.2065V22.0543C41.0283 20.8363 41.4596 19.7957 42.3223 18.9327C43.1853 18.07 44.2259 17.6387 45.4439 17.6387H61.0387C62.2567 17.6387 63.2973 18.07 64.1603 18.9327C65.023 19.7957 65.4543 20.8363 65.4543 22.0543V35.2065C65.4543 36.4245 65.023 37.4651 64.1603 38.3281C63.2973 39.1908 62.2567 39.6221 61.0387 39.6221H45.4439ZM61.0387 35.9582C61.2581 35.9582 61.4383 35.8878 61.5791 35.7469C61.72 35.6061 61.7904 35.4259 61.7904 35.2065V22.0543C61.7904 21.8349 61.72 21.6548 61.5791 21.5139C61.4383 21.373 61.2581 21.3026 61.0387 21.3026H45.4439C45.2245 21.3026 45.0444 21.373 44.9035 21.5139C44.7626 21.6548 44.6922 21.8349 44.6922 22.0543V35.2065C44.6922 35.4259 44.7626 35.6061 44.9035 35.7469C45.0444 35.8878 45.2245 35.9582 45.4439 35.9582H61.0387ZM52.02 32.2943C53.0378 32.2943 53.9028 31.9381 54.6153 31.2257C55.3277 30.5132 55.6839 29.6482 55.6839 28.6304C55.6839 27.6127 55.3277 26.7476 54.6153 26.0351C53.9028 25.3227 53.0378 24.9665 52.02 24.9665C51.0023 24.9665 50.1372 25.3227 49.4247 26.0351C48.7123 26.7476 48.3561 27.6127 48.3561 28.6304C48.3561 29.6482 48.7123 30.5132 49.4247 31.2257C50.1372 31.9381 51.0023 32.2943 52.02 32.2943Z"
                    fill="var(--color-blue)"
                  />
                </svg>
                <h2 className={styles.popup__title}>충전하실 금액을 선택해 주세요</h2>
              </div>

              <div className={styles.popup__dropdown}>
                <button
                  type="button"
                  className={styles.dropdown__button}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  data-testid="dropdown-button"
                >
                  <span className={styles.dropdown__text}>
                    {selectedAmount ? selectedAmount.toLocaleString() : "내용입력"}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.68222 13.75C8.54672 13.75 8.43755 13.7043 8.35472 13.613C8.27189 13.5218 8.23047 13.4154 8.23047 13.2937C8.23047 13.2632 8.27722 13.1577 8.37072 12.977L11.5217 9.826C11.5941 9.7535 11.6689 9.70058 11.7462 9.66725C11.8236 9.63392 11.9086 9.61725 12.0015 9.61725C12.0943 9.61725 12.1794 9.63392 12.2567 9.66725C12.3341 9.70058 12.4089 9.7535 12.4812 9.826L15.6325 12.977C15.6758 13.0205 15.71 13.0691 15.735 13.1227C15.76 13.1762 15.7725 13.2337 15.7725 13.295C15.7725 13.4175 15.7311 13.524 15.6482 13.6145C15.5654 13.7048 15.4562 13.75 15.3207 13.75H8.68222Z"
                      fill="var(--color-gray-black)"
                      transform={isDropdownOpen ? "" : "rotate(180 12 12)"}
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdown__list} data-testid="dropdown-list">
                    {POINT_OPTIONS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={styles.dropdown__item}
                        onClick={() => handleAmountSelect(amount)}
                        data-testid={`dropdown-item-${amount}`}
                      >
                        <span>{amount.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.popup__actions}>
                <Button variant="modalBtn" type="button" onClick={handleCancel} disabled={loading}>
                  취소
                </Button>
                <Button
                  variant="modalBtn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!selectedAmount || loading}
                >
                  {loading ? "충전 중..." : "충전하기"}
                </Button>
              </div>
            </>
          )}

          {modalView === "success" && (
            <>
              <div className={styles.popup__header}>
                <h2 className={styles.popup__title}>
                  <CheckCircleTwoTone style={{ fontSize: "2rem" }} twoToneColor={COLORS.BLUE} /> 충전이
                  완료되었습니다
                </h2>
                <p className={styles.popup__description}>
                  {selectedAmount?.toLocaleString()}원이 충전되었습니다.
                </p>
              </div>

              <div className={styles.popup__actions}>
                <Button variant="modalBtn" type="button" onClick={handleSuccessConfirm}>
                  확인
                </Button>
              </div>
            </>
          )}

          {modalView === "failed" && (
            <>
              <div className={styles.popup__header}>
                <h2 className={styles.popup__title}>
                  <CloseCircleTwoTone style={{ fontSize: "2rem" }} twoToneColor={COLORS.RED} /> 충전에
                  실패했습니다
                </h2>
                <p className={styles.popup__description}>{errorMessage}</p>
              </div>

              <div className={styles.popup__actions}>
                <Button variant="modalBtn" type="button" onClick={handleFailedClose}>
                  닫기
                </Button>
                <Button variant="modalBtn" type="submit" onClick={handleFailedRetry}>
                  다시 시도
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
