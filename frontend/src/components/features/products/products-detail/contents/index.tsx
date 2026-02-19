"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { Modal } from "antd";
import ProductsDetailCard from "../card";
import styles from "./styles.module.css";
import useFetchTravelproduct from "./hooks/index.binding.hook";
import GoogleMapComponent from "@/components/commons/google-map";

// SVG 아이콘 컴포넌트
const DeleteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.941 8.00022 9.76292 8.07206 9.61925 8.21572C9.47575 8.35956 9.404 8.53772 9.404 8.75022V16.2502C9.404 16.4627 9.47583 16.6409 9.6195 16.7847C9.76333 16.9284 9.94158 17.0002 10.1543 17.0002ZM13.8465 17.0002C14.059 17.0002 14.2371 16.9284 14.3807 16.7847C14.5243 16.6409 14.596 16.4627 14.596 16.2502V8.75022C14.596 8.53772 14.5242 8.35956 14.3805 8.21572C14.2367 8.07206 14.0584 8.00022 13.8458 8.00022C13.6333 8.00022 13.4552 8.07206 13.3115 8.21572C13.168 8.35956 13.0962 8.53772 13.0962 8.75022V16.2502C13.0962 16.4627 13.1682 16.6409 13.312 16.7847C13.4557 16.9284 13.6338 17.0002 13.8465 17.0002Z"
      className={styles.iconFill}
    />
  </svg>
);

const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.0385 16.5384C5.78283 16.5384 4.7125 16.0959 3.8275 15.2109C2.9425 14.3261 2.5 13.2559 2.5 12.0004C2.5 10.7449 2.9425 9.67459 3.8275 8.78943C4.7125 7.90409 5.78283 7.46143 7.0385 7.46143H10.0578C10.2702 7.46143 10.4483 7.53334 10.592 7.67718C10.7358 7.82101 10.8077 7.99926 10.8077 8.21192C10.8077 8.42442 10.7358 8.60251 10.592 8.74617C10.4483 8.88967 10.2702 8.96143 10.0578 8.96143H7.03725C6.19825 8.96143 5.48233 9.25792 4.8895 9.85092C4.2965 10.4439 4 11.1603 4 11.9999C4 12.8396 4.2965 13.5559 4.8895 14.1489C5.48233 14.7419 6.19825 15.0384 7.03725 15.0384H10.0578C10.2702 15.0384 10.4483 15.1103 10.592 15.2542C10.7358 15.398 10.8077 15.5762 10.8077 15.7887C10.8077 16.0013 10.7358 16.1794 10.592 16.3229C10.4483 16.4666 10.2702 16.5384 10.0578 16.5384H7.0385ZM9 12.7499C8.7875 12.7499 8.60942 12.678 8.46575 12.5342C8.32192 12.3903 8.25 12.2122 8.25 11.9997C8.25 11.787 8.32192 11.6089 8.46575 11.4654C8.60942 11.3218 8.7875 11.2499 9 11.2499H15C15.2125 11.2499 15.3906 11.3218 15.5343 11.4657C15.6781 11.6095 15.75 11.7877 15.75 12.0002C15.75 12.2128 15.6781 12.3909 15.5343 12.5344C15.3906 12.6781 15.2125 12.7499 15 12.7499H9ZM13.9423 16.5384C13.7298 16.5384 13.5517 16.4665 13.408 16.3227C13.2642 16.1788 13.1923 16.0006 13.1923 15.7879C13.1923 15.5754 13.2642 15.3973 13.408 15.2537C13.5517 15.1102 13.7298 15.0384 13.9423 15.0384H16.9628C17.8018 15.0384 18.5177 14.7419 19.1105 14.1489C19.7035 13.5559 20 12.8396 20 11.9999C20 11.1603 19.7035 10.4439 19.1105 9.85092C18.5177 9.25792 17.8018 8.96143 16.9628 8.96143H13.9423C13.7298 8.96143 13.5517 8.88951 13.408 8.74568C13.2642 8.60184 13.1923 8.42368 13.1923 8.21118C13.1923 7.99851 13.2642 7.82043 13.408 7.67693C13.5517 7.53326 13.7298 7.46143 13.9423 7.46143H16.9615C18.2172 7.46143 19.2875 7.90393 20.1725 8.78893C21.0575 9.67376 21.5 10.7439 21.5 11.9994C21.5 13.2549 21.0575 14.3253 20.1725 15.2104C19.2875 16.0958 18.2172 16.5384 16.9615 16.5384H13.9423Z"
      className={styles.iconFill}
    />
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.0011 19.5135C13.9575 17.7622 15.4545 16.0823 16.4924 14.474C17.5302 12.8657 18.0491 11.457 18.0491 10.248C18.0491 8.425 17.47 6.92633 16.3116 5.752C15.1533 4.57767 13.7165 3.9905 12.0011 3.9905C10.2858 3.9905 8.84896 4.57767 7.69062 5.752C6.53229 6.92633 5.95312 8.425 5.95312 10.248C5.95312 11.457 6.47204 12.8657 7.50988 14.474C8.54771 16.0823 10.0448 17.7622 12.0011 19.5135ZM12.0011 20.9403C11.8063 20.9403 11.6115 20.9067 11.4166 20.8395C11.2216 20.7722 11.0453 20.668 10.8876 20.527C9.99029 19.7 9.15054 18.8483 8.36838 17.972C7.58637 17.0958 6.90662 16.2199 6.32912 15.3443C5.75146 14.4686 5.29438 13.6007 4.95788 12.7405C4.62138 11.8802 4.45312 11.0493 4.45312 10.248C4.45312 7.94033 5.19954 6.07208 6.69237 4.64325C8.18537 3.21442 9.95496 2.5 12.0011 2.5C14.0473 2.5 15.8169 3.21442 17.3099 4.64325C18.8027 6.07208 19.5491 7.94033 19.5491 10.248C19.5491 11.0493 19.3809 11.8785 19.0444 12.7355C18.7079 13.5927 18.2525 14.4607 17.6781 15.3395C17.1036 16.2183 16.4254 17.0943 15.6434 17.9672C14.8614 18.8404 14.0216 19.6904 13.1241 20.5173C12.9688 20.6583 12.7922 20.764 12.5944 20.8345C12.3967 20.905 12.199 20.9403 12.0011 20.9403ZM12.0029 11.8652C12.5004 11.8652 12.9257 11.6881 13.2789 11.3338C13.6322 10.9794 13.8089 10.5535 13.8089 10.056C13.8089 9.5585 13.6317 9.13308 13.2774 8.77975C12.923 8.42658 12.497 8.25 11.9994 8.25C11.5019 8.25 11.0765 8.42717 10.7234 8.7815C10.37 9.13583 10.1934 9.56183 10.1934 10.0595C10.1934 10.557 10.3705 10.9823 10.7249 11.3355C11.0792 11.6887 11.5052 11.8652 12.0029 11.8652Z"
      className={styles.iconFill}
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17.4615L8.03075 19.1652C7.42825 19.4229 6.85583 19.3736 6.3135 19.0173C5.77117 18.6609 5.5 18.1597 5.5 17.5135V5.30775C5.5 4.80258 5.675 4.375 6.025 4.025C6.375 3.675 6.80258 3.5 7.30775 3.5H16.6923C17.1974 3.5 17.625 3.675 17.975 4.025C18.325 4.375 18.5 4.80258 18.5 5.30775V17.5135C18.5 18.1597 18.2288 18.6609 17.6865 19.0173C17.1442 19.3736 16.5718 19.4229 15.9693 19.1652L12 17.4615ZM12 15.8L16.5673 17.7673C16.6699 17.8121 16.7677 17.8025 16.8605 17.7385C16.9535 17.6743 17 17.5878 17 17.4788V5.30775C17 5.23075 16.9679 5.16025 16.9038 5.09625C16.8398 5.03208 16.7692 5 16.6923 5H7.30775C7.23075 5 7.16025 5.03208 7.09625 5.09625C7.03208 5.16025 7 5.23075 7 5.30775V17.4788C7 17.5878 7.0465 17.6743 7.1395 17.7385C7.23233 17.8025 7.33008 17.8121 7.43275 17.7673L12 15.8ZM12 5H7H17H12Z"
      className={styles.bookmarkIconFill}
    />
  </svg>
);

export default function ProductsDetailContents() {
  const { data, loading, error } = useFetchTravelproduct();

  const product = data?.fetchTravelproduct;

  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [circularPictures, setCircularPictures] = useState<string[]>([]);
  const [mainPicture, setMainPicture] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const images = useMemo(
    () =>
      product?.images && product.images.length > 0
        ? product.images.map((img) => `https://storage.googleapis.com/${img}`)
        : [],
    [product?.images]
  );
  const originalPicturesLength = images.length;
  const tags = product?.tags?.map((tag) => `#${tag}`).join(" ") || "";

  const address = product?.travelproductAddress?.address;
  const lat = product?.travelproductAddress?.lat;
  const lng = product?.travelproductAddress?.lng;

  // 캐러셀을 위한 순환 배열 생성
  useEffect(() => {
    if (images.length > 0 && circularPictures.length === 0) {
      // 무한 스크롤을 위해 배열을 3번 복제 (이전, 현재, 다음)
      const tripled = [...images, ...images, ...images];
      setCircularPictures(tripled);
      setMainPicture(images[0]);
    }
  }, [images, circularPictures.length]);

  // 초기 스크롤 위치를 중간 섹션으로 설정
  useEffect(() => {
    const wrapper = previewWrapperRef.current;
    if (!wrapper || circularPictures.length === 0) return;

    // DOM이 완전히 렌더링되고 이미지가 로드된 후 실행
    const timer = setTimeout(() => {
      const itemHeight = 152; // 이미지 높이(136px = 8.5rem) + gap(16px = 1rem) = 152px = 9.5rem
      wrapper.scrollTop = itemHeight * originalPicturesLength;
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [circularPictures, originalPicturesLength]);

  // 스크롤 위치 조정 및 무한 스크롤 처리
  useEffect(() => {
    const wrapper = previewWrapperRef.current;
    if (!wrapper || circularPictures.length === 0 || !isInitialized) return;

    let isAdjusting = false;

    const handleScroll = () => {
      if (isAdjusting) return;

      const scrollTop = wrapper.scrollTop;
      const itemHeight = 152; // 이미지 높이(136px = 8.5rem) + gap(16px = 1rem) = 152px = 9.5rem
      const sectionHeight = itemHeight * originalPicturesLength;
      const threshold = itemHeight * 0.5; // 더 여유있는 경계값

      // 첫 번째 섹션 시작 부분에 가까워진 경우 중간 섹션으로 이동
      if (scrollTop <= threshold) {
        isAdjusting = true;
        wrapper.scrollTop = scrollTop + sectionHeight;
        requestAnimationFrame(() => {
          isAdjusting = false;
        });
      }
      // 마지막 섹션 끝 부분에 가까워진 경우 중간 섹션으로 이동
      else if (scrollTop >= sectionHeight * 2 - threshold) {
        isAdjusting = true;
        wrapper.scrollTop = scrollTop - sectionHeight;
        requestAnimationFrame(() => {
          isAdjusting = false;
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // previewWrapper 내부에서 스크롤 이벤트가 상위로 전파되지 않도록 방지
      e.stopPropagation();
    };

    wrapper.addEventListener("scroll", handleScroll);
    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
      wrapper.removeEventListener("wheel", handleWheel);
    };
  }, [circularPictures, originalPicturesLength, isInitialized]);

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

  const handlePreviewClick = (picture: string, clickedIndex: number) => {
    setMainPicture(picture);

    // 클릭한 이미지를 맨 위로 스크롤
    const wrapper = previewWrapperRef.current;
    if (!wrapper) return;

    const itemHeight = 152; // 이미지 높이(136px = 8.5rem) + gap(16px = 1rem) = 152px = 9.5rem
    const currentScrollTop = wrapper.scrollTop;

    // 현재 스크롤 위치에서 보이는 이미지 인덱스 계산
    const currentIndex = Math.round(currentScrollTop / itemHeight);

    // 클릭한 이미지의 원본 배열 내 인덱스
    const originalIndex = clickedIndex % originalPicturesLength;

    // 현재 위치에서 가장 가까운 섹션의 해당 이미지 찾기
    const currentSection = Math.floor(currentIndex / originalPicturesLength);
    const candidates = [
      currentSection * originalPicturesLength + originalIndex,
      (currentSection - 1) * originalPicturesLength + originalIndex,
      (currentSection + 1) * originalPicturesLength + originalIndex,
    ].filter((idx) => idx >= 0 && idx < circularPictures.length);

    // 현재 위치에서 가장 가까운 후보 찾기
    let targetIndex = candidates[0];
    let minDistance = Math.abs(candidates[0] - currentIndex);

    for (const candidate of candidates) {
      const distance = Math.abs(candidate - currentIndex);
      if (distance < minDistance) {
        minDistance = distance;
        targetIndex = candidate;
      }
    }

    wrapper.scrollTo({
      top: itemHeight * targetIndex,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className={styles.productsDetail} data-testid="products-detail-contents">
        <div className={styles.contentsWrapper}>
          <div className={styles.titleSection}>
            <div className={styles.titleWrapper}>
              <p>로딩 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.productsDetail} data-testid="products-detail-contents">
        <div className={styles.contentsWrapper}>
          <div className={styles.titleSection}>
            <div className={styles.titleWrapper}>
              <p>데이터를 불러올 수 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsDetail} data-testid="products-detail-contents">
      <div className={styles.contentsWrapper}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleTop}>
              <h1 className={styles.title} data-testid="product-title">
                {product.name}
              </h1>
              <div className={styles.actions}>
                <button className={styles.iconButton} data-testid="delete-button">
                  <DeleteIcon />
                </button>
                <button className={styles.iconButton} data-testid="link-button">
                  <LinkIcon />
                </button>
                <button className={styles.iconButton} data-testid="location-button">
                  <LocationIcon />
                </button>
                <div className={styles.bookmark} data-testid="bookmark">
                  <BookmarkIcon />
                  <span className={styles.bookmarkCount}>{product.pickedCount || 0}</span>
                </div>
              </div>
            </div>
            <p className={styles.subtitle} data-testid="product-subtitle">
              {product.remarks}
            </p>
            <p className={styles.tags} data-testid="product-tags">
              {tags}
            </p>
          </div>
        </div>

        {/* Pictures Section */}
        {images.length > 0 && (
          <div className={styles.picturesSection} data-testid="pictures-section">
            <div className={styles.mainPicture} data-testid="main-picture">
              <Image src={mainPicture} alt="메인 이미지" fill style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.previewContainer}>
              <div className={styles.previewWrapper} ref={previewWrapperRef} data-testid="preview-wrapper">
                {circularPictures.map((picture, index) => (
                  <div
                    key={index}
                    className={styles.previewPicture}
                    onClick={() => handlePreviewClick(picture, index)}
                    data-testid={`preview-picture-${index}`}
                  >
                    <Image src={picture} alt={`미리보기 ${index + 1}`} fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <div className={styles.previewGradient}></div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Content Section */}
        <div className={styles.contentSection} data-testid="content-section">
          <h2 className={styles.sectionTitle}>상세 설명</h2>
          <div
            className={styles.contentText}
            data-testid="content-text"
            dangerouslySetInnerHTML={{ __html: product.contents }}
          />
        </div>

        {/* Divider */}
        {(address || mapCoordinates) && <div className={styles.divider}></div>}

        {/* Map Section - 주소나 좌표가 있을 때만 표시 */}
        {(address || mapCoordinates) && (
          <div className={styles.mapSection} data-testid="map-section">
            <h2 className={styles.sectionTitle}>상세 위치</h2>
            {mapCoordinates ? (
              <div className={styles.mapPlaceholder} data-testid="map-placeholder">
                <GoogleMapComponent lat={mapCoordinates.lat} lng={mapCoordinates.lng} />
              </div>
            ) : (
              <div className={styles.mapPlaceholder} data-testid="map-placeholder">
                <p>좌표 정보를 불러오는 중입니다...</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ProductsDetailCard
        profileImage={product.seller?.picture || "/images/profile/8.svg"}
        price={product.price || 0}
        seller={product.seller?.name || "판매자"}
      />
    </div>
  );
}
