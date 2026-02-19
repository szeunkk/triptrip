"use client";

import { useState, useEffect } from "react";
import { Button } from "@commons/ui/src/button";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchTravelproducts } from "./hooks/index.binding.hook";

interface Product {
  id: string;
  title: string;
  description: string;
  tags: string;
  seller: string;
  sellerProfileImage: string;
  price: string;
  bookmarkCount: number;
  imageUrl: string;
}

const categories = [
  { icon: "/icons/Single person accommodation.svg", label: "1인 전용" },
  { icon: "/icons/apartment.svg", label: "아파트" },
  { icon: "/icons/hotel.svg", label: "호텔" },
  { icon: "/icons/camp.svg", label: "캠핑" },
  { icon: "/icons/room service.svg", label: "룸 서비스 가능" },
  { icon: "/icons/fire.svg", label: "불멍" },
  { icon: "/icons/spa.svg", label: "반신욕&스파" },
  { icon: "/icons/house on the sea.svg", label: "바다 위 숙소" },
  { icon: "/icons/planterior.svg", label: "플랜테리어" },
];

export default function ProductsList() {
  const [activeTab, setActiveTab] = useState<"available" | "closed">("available");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearchValue, setActiveSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isSoldout = activeTab === "closed";

  const { data, loading, error, fetchMore, refetch } = useFetchTravelproducts({
    isSoldout,
    search: activeSearchValue,
    page: 1,
  });

  // 탭 변경 시 페이지와 데이터 초기화
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setSearchValue("");
    setActiveSearchValue("");
  }, [activeTab]);

  // 검색어 변경 시 페이지 초기화
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeSearchValue]);

  const handleSearch = async () => {
    setActiveSearchValue(searchValue);
    setPage(1);
    setHasMore(true);
    await refetch();
  };

  const transformProducts = (): Product[] => {
    if (!data?.fetchTravelproducts) return [];

    return data.fetchTravelproducts.map((product, index) => ({
      id: product._id,
      title: product.name,
      description: product.remarks,
      tags: product.tags?.map((tag) => `#${tag}`).join(" ") || "",
      bookmarkCount: product.pickedCount,
      price: product.price.toLocaleString(),
      seller: product.seller.name,
      sellerProfileImage: product.seller.picture
        ? `https://storage.googleapis.com/${product.seller.picture.replace(/ /g, "%20")}`
        : "/images/profile/6.svg",
      imageUrl:
        product.images && product.images.length > 0
          ? `https://storage.googleapis.com/${product.images[0].replace(/ /g, "%20")}`
          : `/images/accommodation_${(index % 10) + 1}.png`,
    }));
  };

  const currentProducts = transformProducts();

  const loadMore = async () => {
    if (loading) return;

    const nextPage = page + 1;
    try {
      await fetchMore(nextPage);
      setPage(nextPage);

      // 데이터가 10개 미만이면 더 이상 로드할 데이터가 없음
      if (data?.fetchTravelproducts && data.fetchTravelproducts.length < nextPage * 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more:", err);
      setHasMore(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container} data-testid="products-list">
        <h1 className={styles.title} data-testid="page-title">
          여기에서만 예약할 수 있는 숙소
        </h1>
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container} data-testid="products-list">
        <h1 className={styles.title} data-testid="page-title">
          여기에서만 예약할 수 있는 숙소
        </h1>
        <div>에러가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="products-list">
      {/* Title */}
      <h1 className={styles.title} data-testid="page-title">
        여기에서만 예약할 수 있는 숙소
      </h1>

      {/* Tabs */}
      <div className={styles.tabs} data-testid="tabs">
        <button
          className={`${styles.tab} ${activeTab === "available" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("available")}
          data-testid="tab-available"
        >
          예약 가능 숙소
        </button>
        <button
          className={`${styles.tab} ${activeTab === "closed" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("closed")}
          data-testid="tab-closed"
        >
          예약 마감 숙소
        </button>
      </div>

      {/* Search Bar Group */}
      <div className={styles.searchbarGroup} data-testid="searchbar-group">
        <div className={styles.searchbarLeft}>
          {/* Date Picker */}
          <div className={styles.datepicker} data-testid="datepicker">
            <Image src="/icons/calendar.svg" alt="calendar" width={24} height={24} />
            <div className={styles.dateRange}>
              <div className={styles.dateItem}>
                <span className={styles.dateText}>YYYY</span>
                <span className={styles.dateSeparator}>.</span>
                <span className={styles.dateText}>MM</span>
                <span className={styles.dateSeparator}>.</span>
                <span className={styles.dateText}>DD</span>
              </div>
              <span className={styles.dateRangeSeparator}>-</span>
              <div className={styles.dateItem}>
                <span className={styles.dateText}>YYYY</span>
                <span className={styles.dateSeparator}>.</span>
                <span className={styles.dateText}>MM</span>
                <span className={styles.dateSeparator}>.</span>
                <span className={styles.dateText}>DD</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={styles.searchbar} data-testid="searchbar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className={styles.searchIcon}
            >
              <path d="M6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" />
            </svg>
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className={styles.searchInput}
              data-testid="search-input"
            />
          </div>

          <Button variant="CommentBtn" type="submit" onClick={handleSearch} data-testid="search-button">
            검색
          </Button>
        </div>

        <Button variant="FormBtn" type="submit" data-testid="sell-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.30775 20.5C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.30777C3.5 4.80261 3.675 4.37502 4.025 4.02502C4.375 3.67502 4.80258 3.50002 5.30775 3.50002H12.1598C12.4098 3.50002 12.5973 3.57852 12.7223 3.73552C12.8473 3.89269 12.9098 4.06419 12.9098 4.25002C12.9098 4.43586 12.8447 4.60736 12.7145 4.76452C12.5843 4.92152 12.3942 5.00002 12.1442 5.00002H5.30775C5.23075 5.00002 5.16025 5.03211 5.09625 5.09627C5.03208 5.16027 5 5.23077 5 5.30777V18.6923C5 18.7693 5.03208 18.8398 5.09625 18.9038C5.16025 18.9679 5.23075 19 5.30775 19H18.6923C18.7692 19 18.8398 18.9679 18.9038 18.9038C18.9679 18.8398 19 18.7693 19 18.6923V11.7923C19 11.5423 19.0785 11.3548 19.2355 11.2298C19.3927 11.1048 19.5642 11.0423 19.75 11.0423C19.9358 11.0423 20.1073 11.1048 20.2645 11.2298C20.4215 11.3548 20.5 11.5423 20.5 11.7923V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.30775ZM9.5 13.596V11.8155C9.5 11.5744 9.54683 11.3426 9.6405 11.1203C9.734 10.8978 9.86283 10.7045 10.027 10.5405L18.5598 2.00777C18.7148 1.85261 18.8853 1.73944 19.0712 1.66827C19.2571 1.59711 19.4462 1.56152 19.6385 1.56152C19.8347 1.56152 20.0231 1.59711 20.2038 1.66827C20.3846 1.73944 20.5493 1.84936 20.698 1.99802L21.9538 3.25002C22.0986 3.40519 22.2098 3.57636 22.2875 3.76352C22.365 3.95069 22.4038 4.14044 22.4038 4.33277C22.4038 4.52511 22.3708 4.71161 22.3048 4.89227C22.2388 5.07311 22.1282 5.24102 21.973 5.39602L13.4115 13.9578C13.2473 14.1218 13.0541 14.2532 12.8318 14.352C12.6093 14.4507 12.3775 14.5 12.1365 14.5H10.404C10.1462 14.5 9.93108 14.4138 9.75875 14.2413C9.58625 14.0689 9.5 13.8539 9.5 13.596ZM11 13H12.2463L18.4788 6.76727L17.8558 6.14427L17.1885 5.50202L11 11.6905V13Z"
              fill="var(--color-gray-white)"
            />
          </svg>
          숙박권 판매하기
        </Button>
      </div>

      {/* Products List */}
      <div className={styles.productsList} data-testid="products-list-content">
        {/* Category */}
        <div className={styles.category} data-testid="category">
          {categories.map((cat, index) => (
            <div key={index} className={styles.categoryItem} data-testid={`category-${index}`}>
              <div className={styles.categoryIcon}>
                <Image src={cat.icon} alt={cat.label} width={40} height={40} />
              </div>
              <span className={styles.categoryLabel}>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Card Area */}
        <InfiniteScroll
          dataLength={currentProducts.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<div style={{ textAlign: "center", padding: "20px" }}>로딩 중...</div>}
          endMessage={
            <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
              모든 상품을 불러왔습니다.
            </div>
          }
        >
          <div className={styles.cardArea} data-testid="card-area">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={styles.card}
                data-testid={`product-card-${product.id}`}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={296}
                    height={296}
                    className={styles.cardImagePlaceholder}
                  />
                  <div className={styles.bookmark}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.bookmarkIcon}
                    >
                      <path d="M12 17.4615L8.03075 19.1652C7.42825 19.4229 6.85583 19.3736 6.3135 19.0173C5.77117 18.6609 5.5 18.1597 5.5 17.5135V5.30775C5.5 4.80258 5.675 4.375 6.025 4.025C6.375 3.675 6.80258 3.5 7.30775 3.5H16.6923C17.1974 3.5 17.625 3.675 17.975 4.025C18.325 4.375 18.5 4.80258 18.5 5.30775V17.5135C18.5 18.1597 18.2288 18.6609 17.6865 19.0173C17.1442 19.3736 16.5718 19.4229 15.9693 19.1652L12 17.4615ZM12 15.8L16.5673 17.7673C16.6699 17.8121 16.7677 17.8025 16.8605 17.7385C16.9535 17.6743 17 17.5878 17 17.4788V5.30775C17 5.23075 16.9679 5.16025 16.9038 5.09625C16.8398 5.03208 16.7692 5 16.6923 5H7.30775C7.23075 5 7.16025 5.03208 7.09625 5.09625C7.03208 5.16025 7 5.23075 7 5.30775V17.4788C7 17.5878 7.0465 17.6743 7.1395 17.7385C7.23233 17.8025 7.33008 17.8121 7.43275 17.7673L12 15.8ZM12 5H7H17H12Z" />
                    </svg>
                    <span className={styles.bookmarkCount}>{product.bookmarkCount}</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>
                    <p className={styles.cardDescription}>{product.description}</p>
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.cardTags}>{product.tags}</div>
                    <div className={styles.cardFooter}>
                      <div className={styles.profile}>
                        <Image
                          src={product.sellerProfileImage}
                          alt="profile"
                          width={24}
                          height={24}
                          className={styles.profileImage}
                        />
                        <span className={styles.profileName}>{product.seller}</span>
                      </div>
                      <div className={styles.price}>
                        <span className={styles.priceAmount}>{product.price}</span>
                        <span className={styles.priceUnit}>원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
