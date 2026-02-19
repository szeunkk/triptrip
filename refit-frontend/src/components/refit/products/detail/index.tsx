"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Modal } from "antd";
import dynamic from "next/dynamic";
import styles from "./styles.module.css";
import useFetchTravelproduct from "./hook.binding";
import { useBuyProduct } from "./hook.payments";

// 동적 import로 GoogleMapComponent를 클라이언트 사이드에서만 로드
const GoogleMapComponent = dynamic(() => import("@/components/commons/google-map"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>지도를 불러오는 중입니다...</p>
    </div>
  ),
});

// 가격 포맷 함수
const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR") + "원";
};

// 시간 경과 표시 함수
const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInMs = now.getTime() - createdDate.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return `${diffInYears}년 전`;
  }
};

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [selectedImage, setSelectedImage] = useState(0);
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const { data, loading, error } = useFetchTravelproduct();

  const address = data?.fetchTravelproduct.travelproductAddress?.address;
  const lat = data?.fetchTravelproduct.travelproductAddress?.lat;
  const lng = data?.fetchTravelproduct.travelproductAddress?.lng;
  const soldAt = data?.fetchTravelproduct.soldAt;
  const isSoldOut = soldAt !== null && soldAt !== undefined;

  const handleBackToList = () => {
    router.back();
  };

  const { buyProduct, loading: buyLoading } = useBuyProduct(
    () => {
      Modal.success({
        title: "구매 완료!",
        content: "상품을 성공적으로 구매했습니다.",
        onOk: () => {
          router.refresh();
        },
      });
    },
    (message) => {
      Modal.error({
        title: "구매 실패",
        content: message,
      });
    }
  );

  const handleBuyProduct = () => {
    if (!productId) {
      Modal.error({
        title: "오류",
        content: "상품 정보를 찾을 수 없습니다.",
      });
      return;
    }

    Modal.confirm({
      title: "상품 구매",
      content: "이 상품을 구매하시겠습니까?",
      onOk: async () => {
        await buyProduct(productId);
      },
    });
  };

  // Kakao API를 사용하여 주소를 좌표로 변환
  useEffect(() => {
    const fetchCoordinates = async () => {
      // lat, lng가 이미 있으면 사용
      if (lat && lng) {
        setMapCoordinates({ lat, lng });
        return;
      }

      // lat, lng가 없고 주소가 있으면 Kakao API로 변환
      if (address && !lat && !lng) {
        try {
          const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
            {
              headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}`,
              },
            }
          );

          const result = await response.json();

          if (result.documents && result.documents.length > 0) {
            const { x, y } = result.documents[0];
            setMapCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });
          } else {
            setMapCoordinates(null);
          }
        } catch (error) {
          console.error("좌표 변환 실패:", error);
          const showErrorModal = () =>
            Modal.error({
              title: "좌표 변환에 실패하였습니다.",
              content: (error as Error)?.message ?? "좌표 변환에 실패하였습니다.",
            });
          showErrorModal();
          setMapCoordinates(null);
        }
      }
    };

    fetchCoordinates();
  }, [address, lat, lng]);

  return (
    <div className={styles.detailPage}>
      {/* 목록으로 돌아가기 버튼 */}
      <button className={styles.backButton} onClick={handleBackToList}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.74992 13.8542L3.64575 8.75L8.74992 3.64584"
            stroke="#23345C"
            strokeWidth="1.45833"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.8541 8.75H3.64575"
            stroke="#23345C"
            strokeWidth="1.45833"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>목록으로 돌아가기</span>
      </button>

      <div className={styles.mainContainer}>
        <div className={styles.leftColumn}>
          {/* Title Area */}
          <div className={styles.titleArea}>
            <div className={styles.titleContent}>
              <h1 className={styles.title}>{data?.fetchTravelproduct.name}</h1>
              <div className={styles.subtitle}>
                <span className={styles.subtitleText}>{data?.fetchTravelproduct.remarks}</span>
                <span className={styles.dot}>•</span>
                <span className={styles.timeAgo}>
                  {data?.fetchTravelproduct.createdAt ? getTimeAgo(data.fetchTravelproduct.createdAt) : ""}
                </span>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.iconButton} aria-label="북마크">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0834 12.25L7.00008 9.91667L2.91675 12.25V2.91667C2.91675 2.60725 3.03966 2.3105 3.25846 2.09171C3.47725 1.87292 3.774 1.75 4.08341 1.75H9.91675C10.2262 1.75 10.5229 1.87292 10.7417 2.09171C10.9605 2.3105 11.0834 2.60725 11.0834 2.91667V12.25Z"
                    stroke="#1C2A4A"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className={styles.iconButton} aria-label="공유하기">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4_4126)">
                    <path
                      d="M10.5 4.66667C11.4665 4.66667 12.25 3.88317 12.25 2.91667C12.25 1.95017 11.4665 1.16667 10.5 1.16667C9.5335 1.16667 8.75 1.95017 8.75 2.91667C8.75 3.88317 9.5335 4.66667 10.5 4.66667Z"
                      stroke="#1C2A4A"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 8.75C4.4665 8.75 5.25 7.9665 5.25 7C5.25 6.0335 4.4665 5.25 3.5 5.25C2.5335 5.25 1.75 6.0335 1.75 7C1.75 7.9665 2.5335 8.75 3.5 8.75Z"
                      stroke="#1C2A4A"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 12.8333C11.4665 12.8333 12.25 12.0498 12.25 11.0833C12.25 10.1168 11.4665 9.33333 10.5 9.33333C9.5335 9.33333 8.75 10.1168 8.75 11.0833C8.75 12.0498 9.5335 12.8333 10.5 12.8333Z"
                      stroke="#1C2A4A"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.01074 7.88083L8.99491 10.2025"
                      stroke="#1C2A4A"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.98908 3.7975L5.01074 6.11917"
                      stroke="#1C2A4A"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_4126">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* 사진 미리보기 */}
          {data?.fetchTravelproduct.images && data.fetchTravelproduct.images.length > 0 && (
            <div className={styles.imagePreview}>
              <div className={styles.thumbnailList}>
                {data.fetchTravelproduct.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div
                      className={styles.thumbnailImage}
                      style={{
                        backgroundImage: `url(https://storage.googleapis.com/${image.replace(/ /g, "%20")})`,
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className={styles.mainImage}>
                <div
                  className={styles.mainImageContent}
                  style={{
                    backgroundImage: `url(https://storage.googleapis.com/${data.fetchTravelproduct.images[
                      selectedImage
                    ].replace(/ /g, "%20")})`,
                  }}
                />
              </div>
            </div>
          )}

          {/* 상품 설명 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>상품 설명</h2>
            <p className={styles.description}>{data?.fetchTravelproduct.contents}</p>
          </div>

          {/* 거래 희망 장소 */}
          {(address || mapCoordinates) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>거래 희망 장소</h2>
              <div className={styles.locationInfo}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4_4168)">
                    <path
                      d="M14.5834 7.29165C14.5834 10.9324 10.5446 14.724 9.18831 15.8951C9.06196 15.9901 8.90816 16.0415 8.75008 16.0415C8.592 16.0415 8.4382 15.9901 8.31185 15.8951C6.9556 14.724 2.91675 10.9324 2.91675 7.29165C2.91675 5.74455 3.53133 4.26082 4.62529 3.16686C5.71925 2.07289 7.20299 1.45831 8.75008 1.45831C10.2972 1.45831 11.7809 2.07289 12.8749 3.16686C13.9688 4.26082 14.5834 5.74455 14.5834 7.29165Z"
                      stroke="#23345C"
                      strokeWidth="1.45833"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.75 9.47919C9.95812 9.47919 10.9375 8.49981 10.9375 7.29169C10.9375 6.08356 9.95812 5.10419 8.75 5.10419C7.54188 5.10419 6.5625 6.08356 6.5625 7.29169C6.5625 8.49981 7.54188 9.47919 8.75 9.47919Z"
                      stroke="#23345C"
                      strokeWidth="1.45833"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_4168">
                      <rect width="17.5" height="17.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>{address}</span>
              </div>
              {mapCoordinates ? (
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapWrapper}>
                    <GoogleMapComponent lat={mapCoordinates.lat} lng={mapCoordinates.lng} />
                  </div>
                </div>
              ) : (
                <div className={styles.mapPlaceholder}>
                  <p>좌표 정보를 불러오는 중입니다...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky 영역 - 가격, 구매하기, 판매자 정보 */}
        <div className={styles.rightColumn}>
          <div className={styles.stickyWrapper}>
            {/* 가격 및 구매 카드 */}
            <div className={styles.priceCard}>
              <div className={styles.priceSection}>
                <div className={styles.priceRow}>
                  <span className={styles.priceAmount}>
                    {data?.fetchTravelproduct.price?.toLocaleString("ko-KR")}
                  </span>
                  <span className={styles.priceCurrency}>P</span>
                </div>
                <ul className={styles.infoList}>
                  <li>• Re:fit 포인트로 안전하게 거래하세요</li>
                  <li>• 구매 전 포인트 충전이 필요합니다</li>
                </ul>
              </div>
              <button
                className={`${styles.buyButton} ${isSoldOut ? styles.buyButtonSoldOut : ""}`}
                onClick={handleBuyProduct}
                disabled={buyLoading || loading || isSoldOut}
              >
                {isSoldOut ? "판매완료" : buyLoading ? "구매 중..." : "구매하기"}
              </button>
            </div>

            {/* 판매자 정보 및 찜 영역 */}
            <div className={styles.sellerRow}>
              <div className={styles.sellerCard}>
                <h3 className={styles.sellerTitle}>판매자 정보</h3>
                <div className={styles.sellerInfo}>
                  <div className={styles.sellerAvatar}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 10.5C12.5711 10.5 14.25 8.82107 14.25 6.75C14.25 4.67893 12.5711 3 10.5 3C8.42893 3 6.75 4.67893 6.75 6.75C6.75 8.82107 8.42893 10.5 10.5 10.5Z"
                        stroke="#23345C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 18C18 15.3479 14.6421 13.5 10.5 13.5C6.35786 13.5 3 15.3479 3 18"
                        stroke="#23345C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.sellerDetails}>
                    <div className={styles.sellerName}>{data?.fetchTravelproduct.seller?.name}</div>
                    <div className={styles.sellerLocation}></div>
                  </div>
                </div>
              </div>

              <div className={styles.likeCard}>
                <div className={styles.likeContent}>
                  <div className={styles.likeLabel}>찜</div>
                  <div className={styles.likeCount}>{data?.fetchTravelproduct.pickedCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
