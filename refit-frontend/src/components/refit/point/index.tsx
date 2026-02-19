"use client";

import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/graphql/queries/login";
import styles from "./styles.module.css";
import { usePortonePayment } from "./hook.portone";

const CHARGE_OPTIONS = [
  { amount: "1만원", point: "10,000P", value: 10000 },
  { amount: "3만원", point: "30,000P", value: 30000 },
  { amount: "5만원", point: "50,000P", value: 50000 },
  { amount: "10만원", point: "100,000P", value: 100000, bonus: true },
  { amount: "30만원", point: "300,000P", value: 300000, bonus: true },
  { amount: "50만원", point: "500,000P", value: 500000, bonus: true },
];

export default function PointCharge() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const { requestPayment, loading } = usePortonePayment(
    () => {
      notification.success({
        message: "포인트 충전 완료",
        description: "포인트 충전이 완료되었습니다!",
        placement: "topRight",
        duration: 3,
        style: {
          padding: "12px 16px",
          minHeight: "auto",
        },
      });
    },
    (errorMessage) => {
      notification.error({
        message: "포인트 충전 실패",
        description: errorMessage || "포인트 충전에 실패했습니다. 다시 시도해주세요.",
        placement: "topRight",
        duration: 3,
        style: {
          padding: "12px 16px",
          minHeight: "auto",
        },
      });
    }
  );
  const currentPoint = data?.fetchUserLoggedIn?.userPoint?.amount || 0;

  const handleChargeSelect = (value: number) => {
    setSelectedAmount(value);
  };

  const handleSubmit = async () => {
    if (selectedAmount) {
      await requestPayment(selectedAmount);
    }
  };

  const calculateBonus = (amount: number) => {
    return amount >= 100000 ? Math.floor(amount * 0.05) : 0;
  };

  const chargeAmount = selectedAmount || 0;
  const bonus = calculateBonus(chargeAmount);
  const totalPoints = chargeAmount + bonus;
  const afterChargePoints = currentPoint + totalPoints;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.heading}>
          <h1 className={styles.title}>포인트 충전</h1>
        </div>
        <div className={styles.paragraph}>
          <p className={styles.description}>Re:fit 포인트로 더욱 편리하게 쇼핑하세요</p>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <div className={styles.currentPointCard}>
            <div className={styles.pointInfo}>
              <div className={styles.pointLabelContainer}>
                <p className={styles.pointLabel}>현재 보유 포인트</p>
              </div>
              <div className={styles.pointValueContainer}>
                <p className={styles.pointValue}>{currentPoint.toLocaleString()}P</p>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.1667 8.16667V4.66667C22.1667 4.35725 22.0438 4.0605 21.825 3.84171C21.6062 3.62292 21.3094 3.5 21 3.5H5.83333C5.21449 3.5 4.621 3.74583 4.18342 4.18342C3.74583 4.621 3.5 5.21449 3.5 5.83333C3.5 6.45217 3.74583 7.04566 4.18342 7.48325C4.621 7.92083 5.21449 8.16667 5.83333 8.16667H23.3333C23.6428 8.16667 23.9395 8.28958 24.1583 8.50838C24.3771 8.72717 24.5 9.02391 24.5 9.33333V14M24.5 14H21C20.3812 14 19.7877 14.2458 19.3501 14.6834C18.9125 15.121 18.6667 15.7145 18.6667 16.3333C18.6667 16.9522 18.9125 17.5457 19.3501 17.9832C19.7877 18.4208 20.3812 18.6667 21 18.6667H24.5C24.8094 18.6667 25.1062 18.5438 25.325 18.325C25.5438 18.1062 25.6667 17.8094 25.6667 17.5V15.1667C25.6667 14.8572 25.5438 14.5605 25.325 14.3417C25.1062 14.1229 24.8094 14 24.5 14Z"
                    stroke="white"
                    strokeWidth="2.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 5.8335V22.1668C3.5 22.7857 3.74583 23.3792 4.18342 23.8167C4.621 24.2543 5.21449 24.5002 5.83333 24.5002H23.3333C23.6428 24.5002 23.9395 24.3772 24.1583 24.1585C24.3771 23.9397 24.5 23.6429 24.5 23.3335V18.6668"
                    stroke="white"
                    strokeWidth="2.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.chargeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <h2 className={styles.cardTitleText}>충전 금액 선택</h2>
              </div>
              <div className={styles.cardDescription}>
                <p className={styles.cardDescriptionText}>원하시는 충전 금액을 선택하세요</p>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.buttonGrid}>
                {CHARGE_OPTIONS.map((option, index) => (
                  <div key={option.value} className={styles.buttonWrapper}>
                    <button
                      className={`${styles.chargeButton} ${
                        selectedAmount === option.value ? styles.selected : ""
                      }`}
                      onClick={() => handleChargeSelect(option.value)}
                      data-testid={`charge-button-${option.value}`}
                    >
                      <div className={styles.buttonContent}>
                        <div className={styles.amountLabel}>
                          <p className={styles.amountText}>{option.amount}</p>
                        </div>
                        <div className={styles.pointLabel}>
                          <p className={styles.pointText}>{option.point}</p>
                        </div>
                      </div>
                    </button>
                    {option.bonus && (
                      <div className={styles.badge}>
                        <span className={styles.badgeText}>+5%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.notice}>
                <p className={styles.noticeText}>* 10만원 이상 충전 시 5% 보너스 포인트 지급</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>
              <h2 className={styles.infoCardTitleText}>충전 정보</h2>
            </div>

            <div className={styles.infoCardContent}>
              <div className={styles.chargeInfo}>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>
                    <p className={styles.infoLabelText}>충전 금액</p>
                  </div>
                  <div className={styles.infoValue}>
                    <p className={styles.infoValueText}>{chargeAmount.toLocaleString()}원</p>
                  </div>
                </div>
                {bonus > 0 ? (
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      <p className={styles.infoLabelText}>보너스 (5%)</p>
                    </div>
                    <div className={styles.infoValue}>
                      <p className={styles.infoValueText}>{bonus.toLocaleString()}원</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.totalRow}>
                  <div className={styles.totalRowInner}>
                    <div className={styles.totalLabel}>
                      <p className={styles.totalLabelText}>총 지급 포인트</p>
                    </div>
                    <div className={styles.totalValue}>
                      <p className={styles.totalValueText}>{totalPoints.toLocaleString()}P</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.afterChargeBox}>
                <div className={styles.afterChargeLabel}>
                  <p className={styles.afterChargeLabelText}>충전 후 보유 포인트</p>
                </div>
                <div className={styles.afterChargeValue}>
                  <p className={styles.afterChargeValueText}>{afterChargePoints.toLocaleString()}P</p>
                </div>
              </div>

              <button
                className={styles.chargeActionButton}
                disabled={!selectedAmount}
                data-testid="charge-action-button"
                onClick={handleSubmit}
              >
                충전하기
              </button>

              <div className={styles.noticeBox}>
                <div className={styles.noticeItem}>
                  <p className={styles.noticeItemText}>• 충전된 포인트는 즉시 사용 가능합니다</p>
                </div>
                <div className={styles.noticeItem}>
                  <p className={styles.noticeItemText}>• 포인트 유효기간은 충전일로부터 5년입니다</p>
                </div>
                <div className={styles.noticeItem}>
                  <p className={styles.noticeItemText}>• 환불은 충전 후 7일 이내 가능합니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
