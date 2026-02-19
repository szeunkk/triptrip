"use client";

import { useState } from "react";
import styles from "./styles.module.css";

// 탭 타입
type TabType = "all" | "charge" | "purchase" | "sale";

// Mock 데이터 타입
interface IAllHistory {
  date: string;
  type: "충전" | "구매" | "판매";
  amount: string;
  balance: string;
}

interface IChargeHistory {
  date: string;
  paymentId: string;
  amount: string;
  balance: string;
}

interface IPurchaseHistory {
  date: string;
  productName: string;
  amount: string;
  balance: string;
  seller: string;
}

interface ISaleHistory {
  date: string;
  productName: string;
  amount: string;
  balance: string;
}

// 전체 내역 Mock 데이터
const allHistoryData: IAllHistory[] = [
  { date: "2024.12.16", type: "충전", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "구매", amount: "-50,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "판매", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "충전", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "충전", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "구매", amount: "-50,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "판매", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "판매", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", type: "구매", amount: "-50,000", balance: "1,222,000" },
];

// 충전내역 Mock 데이터
const chargeHistoryData: IChargeHistory[] = [
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", paymentId: "abcd1243", amount: "+1,000,000", balance: "1,222,000" },
];

// 구매내역 Mock 데이터
const purchaseHistoryData: IPurchaseHistory[] = [
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
  {
    date: "2024.12.16",
    productName: "파르나스 호텔 제주",
    amount: "-1,000,000",
    balance: "1,222,000",
    seller: "홍길동",
  },
];

// 판매내역 Mock 데이터
const saleHistoryData: ISaleHistory[] = [
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
  { date: "2024.12.16", productName: "파르나스 호텔 제주", amount: "+1,000,000", balance: "1,222,000" },
];

export default function MypagePoint() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 5;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container} data-testid="mypage-point">
      <div className={styles.tabs} data-testid="point-tabs">
        <button
          className={activeTab === "all" ? styles.tabActive : styles.tab}
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          data-testid="tab-all"
        >
          전체
        </button>
        <button
          className={activeTab === "charge" ? styles.tabActive : styles.tab}
          onClick={() => {
            setActiveTab("charge");
            setCurrentPage(1);
          }}
          data-testid="tab-charge"
        >
          충전내역
        </button>
        <button
          className={activeTab === "purchase" ? styles.tabActive : styles.tab}
          onClick={() => {
            setActiveTab("purchase");
            setCurrentPage(1);
          }}
          data-testid="tab-purchase"
        >
          구매내역
        </button>
        <button
          className={activeTab === "sale" ? styles.tabActive : styles.tab}
          onClick={() => {
            setActiveTab("sale");
            setCurrentPage(1);
          }}
          data-testid="tab-sale"
        >
          판매내역
        </button>
      </div>

      <div className={styles.listContainer}>
        {activeTab === "all" && (
          <div className={styles.listWrapper} data-testid="list-all">
            <div className={styles.listHeader}>
              <div className={styles.headerDate}>날짜</div>
              <div className={styles.headerType}>내용</div>
              <div className={styles.headerAmount}>거래 및 충전 내역</div>
              <div className={styles.headerBalance}>잔액</div>
            </div>
            <div className={styles.listBody}>
              {allHistoryData.map((item, index) => (
                <div key={index} className={styles.listRow}>
                  <div className={styles.cellDate}>{item.date}</div>
                  <div
                    className={`${styles.cellType} ${
                      item.type === "충전" || item.type === "판매" ? styles.typeCharge : styles.typePurchase
                    }`}
                  >
                    {item.type}
                  </div>
                  <div
                    className={`${styles.cellAmount} ${
                      item.amount.startsWith("+") ? styles.amountPositive : styles.amountNegative
                    }`}
                  >
                    {item.amount}
                  </div>
                  <div className={styles.cellBalance}>{item.balance}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "charge" && (
          <div className={styles.listWrapper} data-testid="list-charge">
            <div className={styles.listHeader}>
              <div className={styles.headerDate}>충전일</div>
              <div className={styles.headerPaymentId}>결제 ID</div>
              <div className={styles.headerAmountCharge}>충전내역</div>
              <div className={styles.headerBalance}>거래 후 잔액</div>
            </div>
            <div className={styles.listBody}>
              {chargeHistoryData.map((item, index) => (
                <div key={index} className={styles.listRow}>
                  <div className={styles.cellDate}>{item.date}</div>
                  <div className={styles.cellPaymentId}>{item.paymentId}</div>
                  <div className={`${styles.cellAmountCharge} ${styles.amountPositive}`}>{item.amount}</div>
                  <div className={styles.cellBalance}>{item.balance}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "purchase" && (
          <div className={styles.listWrapper} data-testid="list-purchase">
            <div className={styles.listHeader}>
              <div className={styles.headerDate}>거래일</div>
              <div className={styles.headerProduct}>상품 명</div>
              <div className={styles.headerAmountPurchase}>거래내역</div>
              <div className={styles.headerBalance}>거래 후 잔액</div>
              <div className={styles.headerSeller}>판매자</div>
            </div>
            <div className={styles.listBody}>
              {purchaseHistoryData.map((item, index) => (
                <div key={index} className={styles.listRow}>
                  <div className={styles.cellDate}>{item.date}</div>
                  <div className={styles.cellProduct}>{item.productName}</div>
                  <div className={`${styles.cellAmountPurchase} ${styles.amountNegative}`}>{item.amount}</div>
                  <div className={styles.cellBalance}>{item.balance}</div>
                  <div className={styles.cellSeller}>{item.seller}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sale" && (
          <div className={styles.listWrapper} data-testid="list-sale">
            <div className={styles.listHeader}>
              <div className={styles.headerDate}>거래일</div>
              <div className={styles.headerProductSale}>상품 명</div>
              <div className={styles.headerAmountSale}>거래내역</div>
              <div className={styles.headerBalance}>거래 후 잔액</div>
            </div>
            <div className={styles.listBody}>
              {saleHistoryData.map((item, index) => (
                <div key={index} className={styles.listRow}>
                  <div className={styles.cellDate}>{item.date}</div>
                  <div className={styles.cellProductSale}>{item.productName}</div>
                  <div className={`${styles.cellAmountSale} ${styles.amountPositive}`}>{item.amount}</div>
                  <div className={styles.cellBalance}>{item.balance}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.pagination} data-testid="pagination">
          <button
            onClick={handlePrevPage}
            className={styles.arrowButton}
            disabled={currentPage === 1}
            data-testid="prev-page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                fill={currentPage === 1 ? "#C7C7C7" : "#333333"}
              />
            </svg>
          </button>
          <div className={styles.paginationInner}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={currentPage === page ? styles.pageButtonActive : styles.pageButton}
                data-testid={`page-${page}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className={styles.arrowButton}
            disabled={currentPage === totalPages}
            data-testid="next-page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
                fill={currentPage === totalPages ? "#C7C7C7" : "#333333"}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
