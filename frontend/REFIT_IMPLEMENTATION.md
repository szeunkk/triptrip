# Re:fit - 중고 패션 플랫폼

> **중고 패션 아이템 거래 & 스타일 커뮤니티** - Next.js 기반 풀스택 구현

---

## 📋 프로젝트 개요

중고 패션 아이템 거래와 스타일 커뮤니티를 결합한 웹 애플리케이션  
**4개 도메인**: Products(상품), OOTD(게시글), Point(결제), Auth(인증)

> **주의**: 이 문서는 Re:fit 도메인에 대한 기술 문서입니다.  
> TripTrip 도메인에 대한 정보는 [README.md](./README.md)를 참고하세요.

---

## 🗂 기술 카테고리 구성

이 프로젝트는 **6개의 핵심 기술 카테고리**로 구성되어 있습니다:

1. [**Frontend Architecture**](#1-frontend-architecture) - UI/UX 프레임워크 및 컴포넌트 설계
2. [**Data Layer**](#2-data-layer) - GraphQL, Apollo Client, 데이터 페칭
3. [**State Management**](#3-state-management) - 전역/로컬 상태 관리, 폼 처리
4. [**Styling System**](#4-styling-system) - CSS 아키텍처 및 디자인 시스템
5. [**External Integrations**](#5-external-integrations) - 결제, 지도 등 외부 서비스
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
├── app/
│   └── (re:fit)/              # Re:fit 라우트 그룹
│       ├── remarket/              # 상품
│       │   ├── page.tsx              # 상품 목록
│       │   └── [productId]/
│       │       └── page.tsx          # 상품 상세
│       │
│       ├── fitfeed/               # OOTD 게시판
│       │   ├── page.tsx              # 게시글 목록
│       │   └── [boardId]/
│       │       └── page.tsx          # 게시글 상세
│       │
│       └── user/                  # 사용자
│           ├── login/
│           ├── signup/
│           └── point/
│
├── components/refit/          # Re:fit 컴포넌트
│   ├── products/                 # 상품 기능
│   │   ├── list/
│   │   │   ├── index.tsx            # 뷰 컴포넌트
│   │   │   ├── hook.ts              # 데이터 페칭
│   │   │   └── styles.module.css
│   │   └── detail/
│   │       ├── index.tsx
│   │       ├── hook.binding.ts      # 데이터 바인딩
│   │       ├── hook.payments.ts     # 결제 로직
│   │       └── styles.module.css
│   │
│   ├── ootd/                     # OOTD 게시판
│   │   ├── list/
│   │   │   ├── index.tsx
│   │   │   ├── hook.list.ts         # 목록 조회
│   │   │   ├── hook.best.ts         # BEST 조회
│   │   │   └── styles.module.css
│   │   └── detail/
│   │       ├── index.tsx
│   │       ├── hook.binding.ts
│   │       ├── hook.comment.ts      # 댓글 조회
│   │       ├── hook.comment.write.ts # 댓글 작성
│   │       ├── schema.ts            # Zod 스키마
│   │       └── styles.module.css
│   │
│   ├── point/                    # 결제
│   │   ├── index.tsx
│   │   ├── hook.portone.ts          # Portone SDK
│   │   └── styles.module.css
│   │
│   └── auth/                     # 인증
│       ├── login/
│       │   ├── index.tsx
│       │   ├── hook.ts
│       │   ├── schema.ts
│       │   └── styles.module.css
│       └── signup/
│           ├── index.tsx
│           ├── hook.ts
│           ├── schema.ts
│           └── styles.module.css
│
└── commons/
    └── layout/
        └── refit_nav/            # Re:fit 전용 네비게이션
            ├── index.tsx
            └── style.module.css
```

### **설계 패턴**

#### **1. Route Groups (App Router)**

```typescript
// app/(re:fit)/remarket/[productId]/page.tsx
export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return <ProductDetail productId={params.productId} />;
}

// (re:fit) 그룹으로 레이아웃 분리
```

#### **2. Container-Presenter Pattern**

```typescript
// Presenter (index.tsx)
export default function ProductsList() {
  const { data, onNext, hasMore } = useFetchTravelproducts();
  return <div>{/* UI */}</div>;
}

// Container (hook.ts)
export const useFetchTravelproducts = () => {
  const { data, fetchMore } = useQuery(FETCH_TRAVELPRODUCTS);
  // 비즈니스 로직
  return { data, onNext, hasMore };
};
```

#### **3. Multi-Hook 패턴**

한 컴포넌트에서 여러 Custom Hook을 조합하여 사용

```typescript
// components/refit/products/detail/index.tsx
export default function ProductDetail() {
  const { product, loading } = useProductBinding(); // 데이터 바인딩
  const { buyProduct, loading: buying } = useBuyProduct(); // 구매 로직
  const { distance } = useDistance(product?.address); // 거리 계산

  return <div>{/* UI */}</div>;
}
```

### **UI 라이브러리**

```typescript
- Ant Design (Modal, Notification)       // 모달, 알림
- react-infinite-scroll-component ~6.1   // 무한 스크롤
```

### **코드 스플리팅**

```typescript
// Google Maps는 클라이언트 사이드에서만 로드
import dynamic from "next/dynamic";

const GoogleMapComponent = dynamic(() => import("@/components/commons/google-map"), {
  ssr: false,
});
```

---

## 2. Data Layer

### **핵심 기술 스택**

```typescript
- @apollo/client ~3.11.10              // GraphQL 클라이언트
- graphql 16.11.0                      // GraphQL 스키마
- @graphql-codegen/cli 6.0.0           // 타입 자동 생성
```

### **GraphQL 구조**

```
src/graphql/
├── mutations/
│   ├── product.ts       # 상품 Mutation
│   ├── point.ts         # 포인트 Mutation
│   └── login.ts         # 인증 Mutation
│
└── queries/
    ├── product.ts       # 상품 Query
    └── login.ts         # 인증 Query
```

### **데이터 페칭 패턴**

#### **1. 상품 목록 조회 (무한 스크롤 - fetchMore)**

```typescript
// components/refit/products/list/hook.ts
import { useQuery } from "@apollo/client";
import { FETCH_TRAVELPRODUCTS } from "@/graphql/queries/product";
import { useState } from "react";

export const useFetchTravelproducts = () => {
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, fetchMore: apolloFetchMore } = useQuery(FETCH_TRAVELPRODUCTS);

  const onNext = async () => {
    if (data === undefined) return;

    await apolloFetchMore({
      variables: {
        page: Math.ceil((data.fetchTravelproducts.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproducts: [
            ...(prev.fetchTravelproducts || []),
            ...(fetchMoreResult.fetchTravelproducts || []),
          ],
        };
      },
    });
  };

  return { data, loading, error, onNext, hasMore };
};
```

**사용 예시**:

```typescript
// components/refit/products/list/index.tsx
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductsList() {
  const { data, onNext, hasMore } = useFetchTravelproducts();

  return (
    <InfiniteScroll
      next={onNext}
      hasMore={hasMore}
      loader={<div>로딩중입니다</div>}
      dataLength={data?.fetchTravelproducts.length ?? 0}
    >
      {data?.fetchTravelproducts.map((product) => (
        <div key={product._id}>{/* 상품 카드 */}</div>
      ))}
    </InfiniteScroll>
  );
}
```

#### **2. 상품 상세 조회**

```typescript
// components/refit/products/detail/hook.binding.ts
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_TRAVELPRODUCT } from "@/graphql/queries/product";

export default function useFetchTravelproduct() {
  const params = useParams();
  const productId = params.productId as string;

  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCT, {
    variables: {
      travelproductId: productId,
    },
    skip: !productId,
  });

  return { data, loading, error };
}
```

#### **3. 상품 구매 (Mutation)**

```typescript
// components/refit/products/detail/hook.payments.ts
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "@/graphql/mutations/point";

export const useBuyProduct = (onSuccess: () => void, onFailed: (message: string) => void) => {
  const [createPointTransactionOfBuyingAndSelling, { loading, error }] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  const buyProduct = async (useritemId: string): Promise<boolean> => {
    try {
      const result = await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId },
      });

      if (result.data?.createPointTransactionOfBuyingAndSelling) {
        onSuccess();
        return true;
      } else {
        onFailed("상품 구매에 실패했습니다.");
        return false;
      }
    } catch (err) {
      console.error("상품 구매 오류:", err);
      const errorMessage = (err as Error)?.message ?? "상품 구매에 실패했습니다.";
      onFailed(errorMessage);
      return false;
    }
  };

  return { buyProduct, loading, error: error as Error | null };
};
```

#### **4. OOTD 좋아요/싫어요 (refetchQueries)**

```typescript
// components/refit/ootd/detail/hook.binding.ts
import { useMutation, useQuery } from "@apollo/client";
import { FetchBoardDocument, LikeBoardDocument, DislikeBoardDocument } from "@/commons/graphql/graphql";

export default function useBoardsDetail() {
  const params = useParams();
  const boardId = params.boardId;

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: boardId as string },
  });

  const [likeBoard] = useMutation(LikeBoardDocument);

  const onClickLikeBoard = async () => {
    try {
      const result = await likeBoard({
        variables: { boardId: boardId as string },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: { boardId: boardId },
          },
        ],
      });
      // 좋아요 수 업데이트
      const count = result?.data?.likeBoard as number;
      setLikeCount(count);
    } catch (error) {
      Modal.error({
        title: "에러가 발생하였습니다.",
        content: (error as string) ?? "에러가 발생하였습니다",
      });
    }
  };

  return {
    /* ... */
  };
}
```

#### **5. OOTD 댓글 작성 (refetchQueries)**

```typescript
// components/refit/ootd/detail/hook.comment.write.ts
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBoardCommentDocument,
  CreateBoardCommentInput,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { commentCreateFormSchema, CommentCreateFormValues } from "./schema";

export default function useCommentForm() {
  const params = useParams();
  const boardId = String(params.boardId);

  const methods = useForm<CommentCreateFormValues>({
    defaultValues: {
      writer: "",
      password: "",
      contents: "",
      rating: 3,
    },
    resolver: zodResolver(commentCreateFormSchema),
    mode: "onChange",
  });

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const onClickCommentSubmit = async (data: CommentCreateFormValues) => {
    const createBoardCommentInput: CreateBoardCommentInput = { ...data };

    try {
      await createBoardComment({
        variables: { createBoardCommentInput, boardId },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { page: 1, boardId },
          },
        ],
      });

      // 폼 초기화
      methods.reset({
        writer: "",
        password: "",
        contents: "",
        rating: 3,
      });
    } catch (error) {
      Modal.error({
        title: "댓글 등록에 실패하였습니다.",
        content: (error as GraphQLError).message ?? "에러가 발생하였습니다",
      });
    }
  };

  return {
    /* ... */
  };
}
```

### **Apollo Client 캐싱 전략**

```typescript
// Apollo Client 기본 캐싱 정책 사용 (cache-first)
const { data } = useQuery(FETCH_TRAVELPRODUCT, {
  variables: { travelproductId: productId },
  skip: !productId,
});

// Mutation 후 자동 refetch (refetchQueries)
const [likeBoard] = useMutation(LikeBoardDocument);

await likeBoard({
  variables: { boardId },
  refetchQueries: [
    {
      query: FetchBoardDocument,
      variables: { boardId },
    },
  ],
});
```

---

## 3. State Management

### **핵심 기술 스택**

```typescript
- react-hook-form 7.x           // 폼 상태 관리
- zod 4.x                       // 스키마 검증
- @hookform/resolvers 5.x       // react-hook-form + zod 통합
```

### **로컬 상태 관리 (useState)**

```typescript
// components/refit/products/detail/index.tsx
// 이미지 갤러리 상태
const [selectedImage, setSelectedImage] = useState(0);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

// 댓글 모달 상태
const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

// 좌표 캐싱 (Map)
const [addressCoordinates, setAddressCoordinates] = useState<Map<string, Coordinates>>(new Map());
```

### **폼 상태 관리 (react-hook-form + zod)**

#### **1. 로그인 폼**

```typescript
// components/refit/auth/login/schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

```typescript
// components/refit/auth/login/hook.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations/login";
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
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;

      if (accessToken) {
        // 토큰 저장 로직
        router.push("/remarket");
      }
    } catch (err: any) {
      Modal.error({
        title: "로그인 실패",
        content: err.message,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
```

#### **2. 회원가입 폼**

```typescript
// components/refit/auth/signup/schema.ts
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

export type SignupFormData = z.infer<typeof signupSchema>;
```

#### **3. 댓글 작성 폼**

```typescript
// components/refit/ootd/detail/schema.ts
export const commentSchema = z.object({
  contents: z.string().min(1, "댓글 내용을 입력해주세요").max(500, "댓글은 최대 500자까지 입력 가능합니다"),
  rating: z.number().min(1, "별점을 선택해주세요").max(5),
});

export type CommentFormData = z.infer<typeof commentSchema>;
```

```typescript
// components/refit/ootd/detail/hook.comment.write.ts
export const useCommentForm = (boardId: string, onSuccess: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      contents: "",
      rating: 0,
    },
  });

  const [createComment, { loading }] = useMutation(CREATE_BOARD_COMMENT);

  const onSubmit = async (data: CommentFormData) => {
    try {
      await createComment({
        variables: {
          createBoardCommentInput: {
            contents: data.contents,
            rating: data.rating,
          },
          boardId,
        },
        refetchQueries: ["fetchBoardComments"],
      });

      reset();
      onSuccess();
    } catch (err: any) {
      Modal.error({
        title: "댓글 작성 실패",
        content: err.message,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
  };
};
```

---

## 4. Styling System

### **핵심 기술 스택**

```css
- CSS Modules              // 컴포넌트별 스타일 캡슐화
```

### **CSS 아키텍처 원칙**

#### **1. CSS Modules Only**

```css
/* components/refit/products/list/styles.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 20px;
}

.productGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.productCard {
  width: calc(25% - 15px);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.productCard:hover {
  transform: translateY(-4px);
}
```

#### **2. Flexbox 기반 레이아웃 (position-absolute 금지)**

```css
/* components/refit/products/detail/styles.module.css */
.detailContainer {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.imageSection {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.infoSection {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ❌ 금지: position-absolute */
/* ✅ Flexbox로 구현 */
```

### **Masonry 레이아웃 (OOTD 목록)**

```typescript
// components/refit/ootd/list/index.tsx
import { useState, useEffect, useMemo } from "react";

export default function OOTDList() {
  const { boards } = useBoards();
  const [columnCount, setColumnCount] = useState(4);

  // 반응형 컬럼 수 계산
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width <= 768) setColumnCount(1);
      else if (width <= 1200) setColumnCount(2);
      else setColumnCount(4);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  // 컬럼별 아이템 분배
  const columns = useMemo(() => {
    const cols: (typeof boards)[] = Array.from({ length: columnCount }, () => []);

    boards.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });

    return cols;
  }, [boards, columnCount]);

  return (
    <div className={styles.masonryContainer}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={styles.masonryColumn}>
          {column.map((item) => (
            <div key={item._id} className={styles.masonryItem}>
              {/* 카드 내용 */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

```css
/* components/refit/ootd/list/styles.module.css */
.masonryContainer {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.masonryColumn {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.masonryItem {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

/* 반응형 */
@media (max-width: 768px) {
  .masonryContainer {
    flex-direction: column;
  }
}
```

### **반응형 디자인**

```css
/* 모바일 우선 */
.productCard {
  width: 100%;
}

/* 태블릿 */
@media (min-width: 768px) {
  .productCard {
    width: calc(50% - 10px);
  }
}

/* 데스크톱 */
@media (min-width: 1200px) {
  .productCard {
    width: calc(25% - 15px);
  }
}
```

---

## 5. External Integrations

### **핵심 기술 스택**

```typescript
- @portone/browser-sdk/v2        // 결제 시스템
- Google Maps JavaScript API     // 지도 & 거리 계산
- Kakao Local API               // 주소 → 좌표 변환
- uuid 13.x                     // 고유 ID 생성
```

### **1. Portone 결제 시스템**

#### **환경 변수**

```bash
NEXT_PUBLIC_PORTONE_STORE_ID=store-xxx
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=channel-xxx
```

#### **구현**

```typescript
// components/refit/point/hook.portone.ts
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "@/graphql/mutations/point";

export type PaymentStatus = "idle" | "loading" | "success" | "failed";

export const usePortonePayment = (onSuccess: () => void, onFailed: (message: string) => void) => {
  const [createPointTransaction, { loading }] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

  const requestPayment = async (amount: number): Promise<boolean> => {
    try {
      // 환경 변수 확인
      const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
      const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

      if (!storeId || !channelKey) {
        onFailed("환경 변수가 설정되지 않았습니다.");
        return false;
      }

      // UUID v4로 paymentId 생성
      const paymentId = uuidv4();

      // 1. Portone SDK 호출
      const response = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: `포인트 충전 ${amount.toLocaleString()}원`,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
      });

      // 2. 결제 성공 확인
      if (response?.code === undefined) {
        // 3. 서버 검증
        const result = await createPointTransaction({
          variables: { paymentId },
        });

        if (result.data?.createPointTransactionOfLoading) {
          onSuccess();
          return true;
        }

        onFailed("서버 검증에 실패했습니다.");
        return false;
      }

      onFailed("결제가 취소되었거나 실패했습니다.");
      return false;
    } catch (err) {
      console.error("결제 오류:", err);
      onFailed("충전에 실패하였습니다.");
      return false;
    }
  };

  return { requestPayment, loading };
};
```

#### **사용 예시**

```typescript
// components/refit/point/index.tsx
export default function PointCharge() {
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleSuccess = () => {
    Modal.success({
      title: "충전 완료",
      content: `${selectedAmount.toLocaleString()}원이 충전되었습니다.`,
    });
  };

  const handleFailed = (message: string) => {
    Modal.error({
      title: "충전 실패",
      content: message,
    });
  };

  const { requestPayment, loading } = usePortonePayment(handleSuccess, handleFailed);

  const onClickCharge = async () => {
    if (selectedAmount === 0) {
      alert("충전 금액을 선택해주세요");
      return;
    }

    await requestPayment(selectedAmount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.amountButtons}>
        {[1000, 5000, 10000, 50000, 100000].map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={selectedAmount === amount ? styles.selected : ""}
          >
            {amount.toLocaleString()}원
          </button>
        ))}
      </div>

      <button onClick={onClickCharge} disabled={loading}>
        {loading ? "처리중..." : "충전하기"}
      </button>
    </div>
  );
}
```

### **2. Google Maps API (거리 계산)**

```typescript
// components/refit/products/detail/hook.binding.ts
useEffect(() => {
  if (!product?.travelproductAddress) return;

  // Google Maps API 동적 로딩
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=geometry`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = async () => {
    // 사용자 위치 가져오기
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // 상품 위치 좌표 변환 (Kakao API)
      const productCoords = await getCoordinates(product.travelproductAddress.address);

      // 거리 계산
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(userLat, userLng),
        new google.maps.LatLng(productCoords.lat, productCoords.lng)
      );

      setDistance(Math.round(distance / 1000)); // km로 변환
    });
  };
}, [product]);
```

### **3. Kakao Local API (좌표 변환)**

```typescript
// 주소 → 좌표 변환 (캐싱 포함)
const [addressCoordinates, setAddressCoordinates] = useState<Map<string, Coordinates>>(new Map());

const getCoordinates = async (address: string) => {
  // 캐시 확인
  if (addressCoordinates.has(address)) {
    return addressCoordinates.get(address)!;
  }

  // Kakao API 호출
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

  const coords = {
    lat: parseFloat(y),
    lng: parseFloat(x),
  };

  // 캐싱
  setAddressCoordinates((prev) => new Map(prev).set(address, coords));

  return coords;
};
```

---

## 6. Quality & DevOps

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
NEXT_PUBLIC_PORTONE_STORE_ID=store-xxx
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=channel-xxx
NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSy...
NEXT_PUBLIC_KAKAO_APP_JS_KEY=xxx
```

### **타입 체크**

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# GraphQL 타입 생성
npm run codegen
```

---

## 📊 주요 기능 플로우

### **상품 구매 플로우**

```
1. 상품 목록 조회 (useQuery - FETCH_TRAVELPRODUCTS)
2. 무한 스크롤로 추가 상품 로드 (fetchMore + updateQuery)
3. 상품 카드 클릭 → 상세 페이지 이동
4. 상품 상세 조회 (useQuery - FETCH_TRAVELPRODUCT)
5. 구매 버튼 클릭 → Mutation 실행 (CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING)
6. 성공 시 페이지 새로고침 (router.refresh)
7. 성공 알림 (Ant Design Modal.success)
```

### **포인트 충전 플로우**

```
1. 충전 금액 선택 (1000, 5000, 10000, 50000, 100000)
2. 충전하기 버튼 클릭
3. UUID v4로 paymentId 생성
4. Portone SDK 호출 (requestPayment)
5. 결제 창 오픈 → 결제 진행 (EASY_PAY)
6. 결제 완료 콜백 (response.code === undefined)
7. 서버 검증 (CREATE_POINT_TRANSACTION_OF_LOADING)
8. Apollo Cache refresh (refetchQueries)
9. 성공 알림
```

### **OOTD 좋아요 플로우**

```
1. OOTD 상세 페이지 이동
2. 좋아요 버튼 클릭
3. useMutation 실행 (LikeBoardDocument)
4. refetchQueries로 게시글 데이터 자동 갱신
5. UI 업데이트 (좋아요 수 반영)
```

### **OOTD 댓글 작성 플로우**

```
1. 게시글 상세 페이지 이동
2. 댓글 작성 버튼 클릭 → 모달 오픈
3. react-hook-form 초기화
4. 댓글 내용 입력 + 별점 선택
5. Zod 실시간 검증
6. 제출 버튼 클릭 → useMutation (CreateBoardCommentDocument)
7. refetchQueries로 댓글 목록 자동 갱신 (FetchBoardCommentsDocument)
8. 모달 닫기 + 폼 초기화
```

---

## 💡 핵심 기술 선택 이유

### **Next.js 14 App Router**

- 파일 기반 라우팅으로 직관적인 구조
- Route Groups로 Re:fit 도메인 분리
- Server Components 지원
- 최적화된 빌드 시스템

### **Apollo Client**

- 강력한 캐싱 메커니즘
- refetchQueries로 자동 데이터 갱신
- TypeScript 완벽 통합
- Optimistic UI 지원

### **react-hook-form + zod**

- 성능 최적화된 폼 관리 (리렌더링 최소화)
- 타입 안전한 검증
- 직관적인 에러 핸들링
- 작은 번들 크기

### **CSS Modules**

- 스타일 캡슐화로 충돌 방지
- TypeScript 지원
- Zero-runtime (빌드 타임 처리)
- 명확한 스코프

### **Portone SDK v2**

- 다양한 PG사 지원 (EASY_PAY)
- 간단한 통합 (SDK import만으로 사용)
- 서버 검증 기능
- 안정적인 결제 플로우

---

## 📂 관련 문서

- **TripTrip 프로젝트**: [README.md](./README.md) 참고
- 여행 관리 플랫폼 도메인은 별도로 분리되어 관리됩니다.

---

## 📝 주요 구현 특징

### ✅ **기술적 특징**

- TypeScript 기반 타입 안정성
- Apollo Client 기본 캐싱 사용
- **fetchMore + updateQuery** 기반 무한 스크롤
- **refetchQueries**를 통한 자동 데이터 갱신
- Masonry 레이아웃 구현 (OOTD)
- Kakao API 좌표 캐싱 (Map 사용)

### ✅ **아키텍처 특징**

- Route Groups로 도메인 분리
- Container-Presenter 패턴
- Custom Hook 기반 로직 분리
- CSS Modules 스타일 캡슐화
- Flexbox Only 레이아웃

### ✅ **보안 특징**

- 환경 변수로 민감 정보 관리
- Portone 서버 검증 (2-step 검증)
- JWT 기반 인증

---

**프로젝트**: Re:fit - 중고 패션 플랫폼  
**기술 스택**: Next.js 14, TypeScript, Apollo Client, Portone SDK v2  
**작성일**: 2024
