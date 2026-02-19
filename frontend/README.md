# TripTrip - 여행 관리 플랫폼

> **여행 계획부터 추억 공유까지** - Next.js 기반 풀스택 여행 플랫폼

---

## 📋 프로젝트 개요

여행 상품 거래, 여행 일정 관리, 여행 후기 공유를 통합한 여행 종합 플랫폼  
**주요 도메인**: Products(여행 상품), Boards(게시판), MyTrip(여행 관리), OpenAPIs(외부 API 연동)

---

## 🗂 기술 카테고리 구성

이 프로젝트는 **6개의 핵심 기술 카테고리**로 구성되어 있습니다:

1. [**Frontend Architecture**](#1-frontend-architecture) - UI/UX 프레임워크 및 컴포넌트 설계
2. [**Data Layer**](#2-data-layer) - GraphQL, Apollo Client, 데이터 페칭
3. [**State Management**](#3-state-management) - 전역/로컬 상태 관리, 폼 처리
4. [**Styling System**](#4-styling-system) - CSS 아키텍처 및 디자인 시스템
5. [**External Integrations**](#5-external-integrations) - 결제, 지도, 스토리지 등 외부 서비스
6. [**Quality & DevOps**](#6-quality--devops) - 테스트, 빌드, 배포

---

## 1. Frontend Architecture

### **핵심 기술 스택**

```typescript
- Next.js 14.2.32 (App Router)
- React 18
- TypeScript 5.x
```

### **프로젝트 구조**

```
src/
├── app/                       # Next.js App Router
│   ├── (auth)/                   # 인증 라우트 그룹
│   ├── products/                 # 상품 페이지
│   ├── boards/                   # 게시판 페이지
│   ├── mytrip/                   # 여행 관리
│   ├── myapis/                   # API 관리
│   ├── mypage/                   # 마이페이지
│   ├── openapis/                 # 외부 API
│   ├── layout.tsx                # 루트 레이아웃
│   └── globals.css               # 글로벌 스타일
│
├── components/                # 컴포넌트
│   ├── features/                 # 기능별 컴포넌트
│   │   ├── products/
│   │   └── boards/
│   ├── commons/                  # 공통 컴포넌트
│   ├── ui/                       # UI 컴포넌트
│   └── users/                    # 사용자 컴포넌트
│
└── commons/                   # 공통 설정
    ├── layout/                   # 레이아웃 컴포넌트
    ├── settings/                 # Apollo 설정
    ├── stores/                   # Zustand 스토어
    └── hocs/                     # Higher Order Components
```

### **설계 패턴**

#### **1. File-based Routing (App Router)**

```typescript
// app/products/[productId]/page.tsx
export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return <ProductDetail productId={params.productId} />;
}
```

#### **2. Container-Presenter Pattern**

```typescript
// Presenter (index.tsx)
export default function ProductsList() {
  const { data, loading, error } = useFetchProducts();
  return <div>{/* UI */}</div>;
}

// Container (hook.ts)
export const useFetchProducts = () => {
  const { data, loading, error } = useQuery(FETCH_PRODUCTS);
  return { data, loading, error };
};
```

#### **3. Custom Hook 기반 로직 분리**

```typescript
// hooks/useFetchProducts.ts
export const useFetchProducts = () => {
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_PRODUCTS);

  const onNext = async () => {
    // 무한 스크롤 로직
  };

  return { data, onNext, hasMore };
};
```

### **UI 라이브러리**

```typescript
- Ant Design (@ant-design/icons 6.x)    // Modal, Notification
- Swiper 11.x                            // 캐러셀/슬라이더
- Lexical 0.38                           // 리치 텍스트 에디터
- react-icons 5.x                        // 아이콘 라이브러리
- react-infinite-scroll-component ~6.1   // 무한 스크롤
```

### **코드 스플리팅 & 최적화**

```typescript
// 동적 import로 초기 번들 크기 감소
import dynamic from "next/dynamic";

const GoogleMapComponent = dynamic(() => import("@/components/commons/google-map"), {
  ssr: false, // 클라이언트 사이드에서만 로드
});
```

---

## 2. Data Layer

### **핵심 기술 스택**

```typescript
- @apollo/client ~3.11.10              // GraphQL 클라이언트
- graphql 16.11.0                      // GraphQL 스키마
- @graphql-codegen/cli 6.0.0           // 타입 자동 생성
- apollo-upload-client 17.x            // 파일 업로드
```

### **Apollo Client 설정**

```typescript
// commons/settings/apollo-setting.tsx
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  credentials: "include",
});

export const ApolloSetting = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
```

### **GraphQL 구조**

```
src/graphql/
├── mutations/
│   ├── board.ts         # 게시판 Mutation
│   ├── product.ts       # 상품 Mutation
│   ├── point.ts         # 포인트 Mutation
│   └── login.ts         # 인증 Mutation
│
└── queries/
    ├── board.ts         # 게시판 Query
    ├── product.ts       # 상품 Query
    ├── file.ts          # 파일 Query
    └── login.ts         # 인증 Query
```

### **데이터 페칭 패턴**

#### **1. 단순 조회 (useQuery)**

```typescript
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCT } from "@/graphql/queries/product";

export const useProductDetail = (productId: string) => {
  const { data, loading, error } = useQuery(FETCH_PRODUCT, {
    variables: { productId },
    fetchPolicy: "cache-first",
  });

  return { product: data?.fetchProduct, loading, error };
};
```

#### **2. 무한 스크롤 (fetchMore)**

```typescript
export const useFetchProducts = () => {
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_PRODUCTS);

  const onNext = async () => {
    await fetchMore({
      variables: { page: Math.ceil(data.fetchProducts.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchProducts.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchProducts: [...prev.fetchProducts, ...fetchMoreResult.fetchProducts],
        };
      },
    });
  };

  return { data, onNext, hasMore };
};
```

#### **3. Mutation 실행 (useMutation)**

```typescript
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "@/graphql/mutations/board";

export const useCreateBoard = () => {
  const [createBoard, { loading, error }] = useMutation(CREATE_BOARD);

  const onSubmit = async (boardInput) => {
    try {
      const result = await createBoard({
        variables: { createBoardInput: boardInput },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
      return result.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { onSubmit, loading, error };
};
```

#### **4. 파일 업로드 (Apollo Upload)**

```typescript
// commons/settings/apollo-upload-setting.tsx
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "include",
});

// 사용 예시
const [uploadFile] = useMutation(UPLOAD_FILE);

const handleUpload = async (file: File) => {
  const { data } = await uploadFile({
    variables: { file },
  });
  return data.uploadFile.url;
};
```

### **GraphQL Codegen**

```typescript
// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "src/commons/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
```

```bash
# 타입 자동 생성
npm run codegen
```

### **캐싱 전략**

```typescript
// Apollo Cache 정책
const { data } = useQuery(FETCH_PRODUCTS, {
  fetchPolicy: "cache-first", // 캐시 우선
  nextFetchPolicy: "cache-and-network", // 이후엔 네트워크와 병행
});

// Cache 직접 업데이트
client.cache.modify({
  fields: {
    fetchProducts(existing = []) {
      return [...existing, newProduct];
    },
  },
});
```

---

## 3. State Management

### **핵심 기술 스택**

```typescript
- zustand 5.x                   // 전역 상태 관리
- react-hook-form 7.x           // 폼 상태 관리
- zod 4.x                       // 스키마 검증
- @hookform/resolvers 5.x       // react-hook-form + zod 통합
```

### **전역 상태 관리 (Zustand)**

#### **AccessToken Store**

```typescript
// commons/stores/accessTokenStore.ts
import { create } from "zustand";

interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: "" }),
}));
```

#### **사용 예시**

```typescript
// 로그인 시 토큰 저장
const { setAccessToken } = useAccessTokenStore();

const onLogin = async (email, password) => {
  const { data } = await loginUser({ variables: { email, password } });
  setAccessToken(data.loginUser.accessToken);
};

// HOC를 통한 인증 체크
export const withAuth = (Component) => {
  return (props) => {
    const { accessToken } = useAccessTokenStore();

    if (!accessToken) {
      redirect("/login");
    }

    return <Component {...props} />;
  };
};
```

### **폼 상태 관리 (react-hook-form + zod)**

#### **1. 스키마 정의 (Zod)**

```typescript
// components/users/login/schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

```typescript
// components/users/signup/schema.ts
export const signupSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().email("올바른 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
```

#### **2. 폼 Hook 구현**

```typescript
// components/users/login/hook.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "./schema";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser({
        variables: { email: data.email, password: data.password },
      });
      // 성공 처리
    } catch (err) {
      // 에러 처리
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isSubmitting };
};
```

#### **3. 폼 컴포넌트**

```typescript
// components/users/login/index.tsx
export default function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <input {...register("email")} placeholder="이메일" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="비밀번호" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}
```

### **로컬 UI 상태**

```typescript
// useState를 최소화하고 필요한 경우에만 사용
const [selectedImage, setSelectedImage] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
```

---

## 4. Styling System

### **핵심 기술 스택**

```css
- CSS Modules              // 컴포넌트별 스타일 캡슐화
- Tailwind CSS 3.4         // 유틸리티 기반 스타일링
- PostCSS 8.x              // CSS 후처리
```

### **CSS 아키텍처 원칙**

#### **1. CSS Modules Only**

```css
/* styles.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}
```

```typescript
// index.tsx
import styles from "./styles.module.css";

export default function Component() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>제목</h2>
      </div>
    </div>
  );
}
```

#### **2. Flexbox 기반 레이아웃 (position-absolute 금지)**

```css
/* ❌ 금지: position-absolute */
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ✅ 권장: Flexbox */
.modalContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.modal {
  width: 500px;
  padding: 24px;
}
```

#### **3. 글로벌 CSS 최소화**

```css
/* app/globals.css - 전역 스타일만 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Pretendard", sans-serif;
}

/* :root, :global, !important 사용 금지 */
```

### **Tailwind CSS 통합**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
      },
    },
  },
  plugins: [],
};

export default config;
```

```typescript
// 유틸리티 클래스 사용
<div className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">제목</h2>
  <p className="text-sm text-gray-600">내용</p>
</div>
```

### **반응형 디자인**

```css
/* 모바일 우선 */
.grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 태블릿 */
@media (min-width: 768px) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .gridItem {
    width: calc(50% - 8px);
  }
}

/* 데스크톱 */
@media (min-width: 1200px) {
  .gridItem {
    width: calc(25% - 12px);
  }
}
```

### **네이밍 컨벤션**

```css
/* BEM 스타일 네이밍 */
.productCard {
}
.productCard__image {
}
.productCard__title {
}
.productCard__price {
}
.productCard--featured {
}
```

---

## 5. External Integrations

### **핵심 기술 스택**

```typescript
- @portone/browser-sdk 0.1          // 결제 시스템
- @googlemaps/js-api-loader 2.x     // 구글 맵 API
- @supabase/supabase-js 2.x         // 데이터베이스 (MyAPIs 전용)
- apollo-upload-client 17.x         // GraphQL 파일 업로드
- react-daum-postcode 3.x           // 주소 검색
- uuid 13.x                         // 고유 ID 생성
```

### **1. Portone 결제 시스템**

#### **설정**

```typescript
// .env.local
NEXT_PUBLIC_PORTONE_STORE_ID = store - xxx;
NEXT_PUBLIC_PORTONE_CHANNEL_KEY = channel - xxx;
```

#### **구현**

```typescript
// components/mypage/point/hook.portone.ts
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";

export const usePortonePayment = (onSuccess: () => void, onFailed: (message: string) => void) => {
  const [createPointTransaction] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

  const requestPayment = async (amount: number) => {
    try {
      const paymentId = uuidv4();

      // 1. Portone SDK 호출
      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId,
        orderName: `포인트 충전 ${amount.toLocaleString()}원`,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      // 2. 서버 검증
      if (response?.code === undefined) {
        const result = await createPointTransaction({
          variables: { paymentId },
        });

        if (result.data) {
          onSuccess();
          return true;
        }
      }

      onFailed("결제 실패");
      return false;
    } catch (err) {
      onFailed("충전 실패");
      return false;
    }
  };

  return { requestPayment };
};
```

### **2. Google Maps API**

#### **설정**

```typescript
// .env.local
NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSy...
```

#### **구현**

```typescript
// components/commons/google-map/index.tsx
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function GoogleMapComponent({ lat, lng, address }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
        version: "weekly",
        libraries: ["geometry", "places"],
      });

      const google = await loader.load();

      const map = new google.maps.Map(mapRef.current!, {
        center: { lat, lng },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: address,
      });
    };

    initMap();
  }, [lat, lng, address]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
}
```

#### **거리 계산**

```typescript
// 두 지점 간 거리 계산 (meters)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const from = new google.maps.LatLng(lat1, lng1);
  const to = new google.maps.LatLng(lat2, lng2);

  const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
  return Math.round(distance / 1000); // km로 변환
};
```

### **3. GraphQL 파일 업로드 (Apollo Upload Client)**

#### **설정**

```typescript
// commons/settings/apollo-upload-setting.tsx
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "include",
});
```

#### **Mutation**

```typescript
// graphql/queries/file.ts
import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
```

#### **구현 - 파일 업로드**

```typescript
// 단일 파일 업로드 (Boards)
import { useMutation } from "@apollo/client";
import { UploadFileDocument } from "@/commons/graphql/graphql";

const [uploadFile] = useMutation(UploadFileDocument);

const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // 파일 사이즈 검증
  if (file.size > 5 * 1024 * 1024) {
    alert("업로드 가능한 용량(5MB)을 초과하였습니다.");
    return;
  }

  const result = await uploadFile({
    variables: { file },
  });

  const fileUrl = result.data?.uploadFile.url;
  return fileUrl;
};
```

```typescript
// 다중 파일 업로드 (Products)
import { UPLOAD_FILE } from "@/graphql/queries/file";

const [uploadFile] = useMutation(UPLOAD_FILE);

const uploadImages = async (files: File[]) => {
  const imageUrls: string[] = [];

  for (const file of files) {
    const uploadResult = await uploadFile({
      variables: { file },
    });

    if (uploadResult.data?.uploadFile?.url) {
      imageUrls.push(uploadResult.data.uploadFile.url);
    }
  }

  return imageUrls;
};
```

#### **구현 - 이미지 미리보기 (FileReader)**

```typescript
// components/features/products/products-write/hooks/index.hook.ts
const [imageFiles, setImageFiles] = useState<File[]>([]);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const newFiles = Array.from(files);
  setImageFiles((prev) => [...prev, ...newFiles]);

  // FileReader를 사용하여 이미지 미리보기 생성
  newFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result && typeof result === "string") {
        setImagePreviews((prev) => [...prev, result]);
      }
    };
    reader.readAsDataURL(file); // Base64 DataURL로 변환
  });

  event.target.value = ""; // input 초기화
};
```

### **4. Supabase (데이터베이스 - MyAPIs 전용)**

#### **설정**

```typescript
// commons/libraries/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### **사용 예시 - 여행 목록 관리**

```typescript
// components/myapis-list/travel-list/hook.ts
import { supabase } from "@/commons/libraries/supabase";

// 여행 목록 조회
const { data, error } = await supabase.from("travel_list").select("*");

// 여행 추가
const result = await supabase.from("travel_list").insert({
  name: travelName,
  startDate,
  endDate,
});
```

```typescript
// components/myapis-list/travel-detail/expense-write/index.tsx
import { supabase } from "@/commons/libraries/supabase";

// 경비 내역 추가
const result = await supabase.from("travel_expense").insert({
  travel_id: travelId,
  category,
  amount,
  description,
});
```

### **5. Daum 주소 검색**

#### **구현**

```typescript
import DaumPostcode from "react-daum-postcode";

export const AddressSearch = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
    onComplete({
      zipcode: data.zonecode,
      address: data.address,
      addressDetail: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>우편번호 검색</button>

      {isOpen && (
        <div className={styles.modal}>
          <DaumPostcode onComplete={handleComplete} />
          <button onClick={() => setIsOpen(false)}>닫기</button>
        </div>
      )}
    </>
  );
};
```

### **6. Kakao Local API (좌표 변환)**

```typescript
// 주소 → 좌표 변환
const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}`,
      },
    }
  );

  const result = await response.json();
  const { x, y } = result.documents[0];

  return { lat: parseFloat(y), lng: parseFloat(x) };
};
```

---

---

## 6. Quality & DevOps

### **핵심 기술 스택**

```typescript
- @playwright/test 1.x      // E2E 테스트
- ESLint 8.x                // 코드 품질
- TypeScript 5.x            // 타입 체크
```

### **Playwright E2E 테스트**

#### **설정**

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

#### **테스트 작성 예시**

```typescript
// tests/products-list.spec.ts
import { test, expect } from "@playwright/test";

test.describe("상품 목록 페이지", () => {
  test("상품 목록이 정상적으로 표시된다", async ({ page }) => {
    await page.goto("/products");

    // data-testid를 사용한 요소 선택 (CSS Module 충돌 방지)
    await expect(page.locator('[data-testid="product-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-card"]')).toHaveCount(10);
  });

  test("상품 클릭 시 상세 페이지로 이동한다", async ({ page }) => {
    await page.goto("/products");

    await page.locator('[data-testid="product-card"]').first().click();

    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.locator('[data-testid="product-detail"]')).toBeVisible();
  });

  test("무한 스크롤이 동작한다", async ({ page }) => {
    await page.goto("/products");

    const initialCount = await page.locator('[data-testid="product-card"]').count();

    // 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // 새로운 아이템이 로드될 때까지 대기
    await page.waitForFunction(
      (count) => document.querySelectorAll('[data-testid="product-card"]').length > count,
      initialCount
    );

    const newCount = await page.locator('[data-testid="product-card"]').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });
});
```

```typescript
// tests/auth.spec.ts
test.describe("인증 플로우", () => {
  test("로그인 - 성공", async ({ page }) => {
    await page.goto("/login");

    await page.locator('[data-testid="email-input"]').fill("test@example.com");
    await page.locator('[data-testid="password-input"]').fill("password123");
    await page.locator('[data-testid="login-button"]').click();

    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
  });

  test("로그인 - 검증 에러", async ({ page }) => {
    await page.goto("/login");

    await page.locator('[data-testid="email-input"]').fill("invalid-email");
    await page.locator('[data-testid="login-button"]').click();

    await expect(page.locator('[data-testid="email-error"]')).toContainText("올바른 이메일");
  });
});
```

#### **테스트 실행**

```bash
# 전체 테스트
npm run test

# UI 모드로 테스트
npm run test:ui

# 특정 테스트만 실행
npm run test:best
```

### **타입 체크**

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# GraphQL 타입 생성
npm run codegen
```

### **린트**

```bash
# ESLint 실행
npm run lint

# ESLint 자동 수정
npm run lint -- --fix
```

### **빌드 & 배포**

```bash
# 개발 서버
npm run dev

# 테스트 모드 (권한 체크 우회)
npm run dev:test

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm run start
```

### **환경 변수 관리**

```bash
# .env.local
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=eyJhbGc...
NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSy...
NEXT_PUBLIC_PORTONE_STORE_ID=store-xxx
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=channel-xxx
NEXT_PUBLIC_KAKAO_APP_JS_KEY=xxx
```

### **Git Workflow**

```bash
# 1. 빌드 확인
npm run build

# 2. Conventional Commits 형식으로 커밋
git add .
git commit -m "feat: 상품 목록 무한 스크롤 구현"

# 3. 푸시
git push origin main
```

---

## 📊 프로젝트 주요 기능 플로우

### **상품 구매 플로우**

```
1. 상품 목록 조회 (useQuery - FETCH_PRODUCTS)
2. 무한 스크롤로 추가 상품 로드 (fetchMore)
3. 상품 카드 클릭 → 상세 페이지 이동
4. 상품 상세 조회 (useQuery - FETCH_PRODUCT)
5. 포인트 확인 (useQuery - FETCH_USER_LOGGED_IN)
6. 구매 버튼 클릭 → Mutation 실행
7. Apollo Cache 자동 업데이트
8. 성공 알림 (Ant Design Notification)
```

### **게시글 작성 플로우**

```
1. 작성 페이지 이동
2. react-hook-form 초기화
3. 이미지 선택 → FileReader 미리보기 생성
4. 폼 입력 → Zod 실시간 검증
5. 제출 버튼 클릭 → useMutation
6. 서버 응답 → 성공 시 목록으로 리다이렉트
7. Apollo Cache 자동 갱신
```

### **포인트 충전 플로우**

```
1. 충전 금액 선택
2. Portone SDK 호출 (requestPayment)
3. 결제 창 오픈 → 결제 진행
4. 결제 완료 콜백
5. 서버 검증 (CREATE_POINT_TRANSACTION)
6. Apollo Cache refresh
7. 성공 알림
```

### **이미지 업로드 플로우**

```
1. 파일 선택 (input type="file")
2. FileReader로 즉시 미리보기 생성 (Base64 DataURL)
3. 실제 업로드는 제출 시점에 진행
4. GraphQL uploadFile mutation 실행
5. 서버에서 반환된 URL을 폼 데이터에 포함
6. 게시글/상품 등록 완료
```

---

## 🚀 시작하기

### **설치**

```bash
cd maincamp/frontend
npm install
```

### **개발 서버**

```bash
# 일반 모드
npm run dev

# 테스트 모드 (권한 체크 우회)
npm run dev:test
```

### **빌드**

```bash
npm run build
npm run start
```

### **GraphQL Codegen**

```bash
npm run codegen
```

### **테스트**

```bash
npm run test           # 전체 테스트
npm run test:ui        # UI 모드
npm run test:best      # 특정 테스트
```

---

## 📂 관련 문서

- **Re:fit 프로젝트**: [REFIT_IMPLEMENTATION.md](./REFIT_IMPLEMENTATION.md) 참고
- 중고 패션 플랫폼 도메인은 별도로 분리되어 관리됩니다.

---

## 💡 핵심 기술 선택 이유

### **Next.js 14**

- App Router로 파일 기반 라우팅
- Server Components 지원
- 최적화된 빌드 시스템
- SEO 친화적

### **Apollo Client**

- 강력한 캐싱 메커니즘
- Optimistic UI 지원
- TypeScript 완벽 통합
- GraphQL Codegen 자동 타입 생성

### **react-hook-form + zod**

- 성능 최적화된 폼 관리
- 타입 안전한 검증
- 작은 번들 크기
- 직관적인 API

### **Zustand**

- 간단한 전역 상태 관리
- Redux보다 적은 보일러플레이트
- TypeScript 지원
- 작은 번들 크기

### **CSS Modules**

- 스타일 캡슐화
- 클래스명 충돌 방지
- TypeScript 지원
- Zero-runtime

### **Playwright**

- 크로스 브라우저 테스트
- 빠른 실행 속도
- 강력한 선택자
- CI/CD 친화적

---

**프로젝트**: TripTrip - 여행 관리 플랫폼  
**기술 스택**: Next.js 14, TypeScript, Apollo Client, Zustand, Tailwind CSS  
**작성일**: 2024
