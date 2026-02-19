"use client";

import { useState } from "react";
import { Button } from "@commons/ui";
import styles from "./styles.module.css";

// Mock 데이터 타입
interface IProduct {
  id: number;
  number: string;
  name: string;
  price: string;
  date: string;
  status?: string;
  seller?: string;
  isSold?: boolean;
}

// 나의 상품 Mock 데이터
const myProductsData: IProduct[] = [
  {
    id: 1,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    status: "판매 완료",
    isSold: true,
  },
  {
    id: 2,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 3,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    status: "판매 완료",
    isSold: true,
  },
  {
    id: 4,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    status: "판매 완료",
    isSold: true,
  },
  {
    id: 5,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 6,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 7,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 8,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 9,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
  {
    id: 10,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    isSold: false,
  },
];

// 북마크 Mock 데이터
const bookmarksData: IProduct[] = [
  {
    id: 1,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 2,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 3,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 4,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 5,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 6,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 7,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 8,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 9,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
  {
    id: 10,
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326,000원",
    date: "2024.12.16",
    seller: "홍길동",
  },
];

export default function MypageProduct() {
  const [activeTab, setActiveTab] = useState<"myproducts" | "bookmarks">("myproducts");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("검색:", searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const currentData = activeTab === "myproducts" ? myProductsData : bookmarksData;

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "myproducts" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("myproducts")}
        >
          나의 상품
        </button>
        <button
          className={`${styles.tab} ${activeTab === "bookmarks" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          북마크
        </button>
      </div>

      {/* Searchbar Group */}
      <div className={styles.searchbargroup}>
        <div className={styles.searchbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className={styles.searchIcon}
          >
            <path
              d="M6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
              fill="black"
            />
          </svg>
          <input
            type="text"
            placeholder="필요한 내용을 검색해 주세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.searchInput}
          />
        </div>
        <Button variant="CommentBtn" type="submit" onClick={handleSearch}>
          검색
        </Button>
      </div>

      {/* List */}
      <div className={styles.list}>
        <div className={styles.listInner}>
          {/* Header */}
          <div className={styles.listHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div
              className={
                activeTab === "myproducts" ? styles.headerProductName : styles.headerBookmarkProductName
              }
            >
              상품 명
            </div>
            <div className={styles.headerPrice}>판매가격</div>
            {activeTab === "bookmarks" && <div className={styles.headerSeller}>판매자</div>}
            <div className={styles.headerDate}>날짜</div>
          </div>

          {/* Table Elements */}
          <div className={styles.listBody}>
            {currentData.map((item) => (
              <div key={item.id} className={styles.tableElement}>
                <div className={styles.rowNumber}>{item.number}</div>
                <div
                  className={
                    activeTab === "myproducts" ? styles.rowProductName : styles.rowBookmarkProductName
                  }
                >
                  <span className={item.isSold ? styles.productNameSold : styles.productName}>
                    {item.name}
                  </span>
                  {item.status && <span className={styles.status}>{item.status}</span>}
                </div>
                <div className={styles.rowPrice}>{item.price}</div>
                {activeTab === "bookmarks" && <div className={styles.rowSeller}>{item.seller}</div>}
                <div className={styles.rowDate}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
