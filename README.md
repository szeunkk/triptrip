# Maincamp - 여행 커뮤니티 플랫폼

SeSAC 메인캠프 프로젝트로 개발된 여행 커뮤니티 플랫폼입니다. 게시판, 상품 관리, 여행 기록 관리 등의 기능을 제공합니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [주요 기능](#주요-기능)
- [개발 가이드](#개발-가이드)
- [코딩 컨벤션](#코딩-컨벤션)

## 🎯 프로젝트 개요

여행 정보를 공유하고, 여행 관련 상품을 거래하며, 개인 여행 경비를 관리할 수 있는 종합 여행 커뮤니티 플랫폼입니다.

### 주요 특징

- 🏗️ **모노레포 구조**: pnpm 워크스페이스 기반
- 🎨 **공통 UI 라이브러리**: Storybook으로 관리되는 재사용 가능한 컴포넌트
- 🔐 **인증 시스템**: JWT 기반 로그인/회원가입
- 🗂️ **GraphQL API**: Apollo Client를 통한 효율적인 데이터 관리
- 📱 **반응형 디자인**: CSS Modules + Flexbox 레이아웃

## 🛠 기술 스택

### Frontend

- **프레임워크**: Next.js 14.2.32 (App Router)
- **언어**: TypeScript 5
- **UI 라이브러리**: 
  - React 18
  - Ant Design 5.27.3
  - React Icons 5.5.0
- **상태관리**: 
  - Zustand 5.0.8 (전역 상태)
  - React Hook Form 7.63.0 (폼 상태)
- **스타일링**: 
  - CSS Modules
  - Tailwind CSS 3.4.1
- **API 통신**: 
  - Apollo Client 3.11.10
  - GraphQL Codegen
- **폼 검증**: 
  - Zod 4.1.11
  - @hookform/resolvers 5.2.2
- **기타 라이브러리**:
  - Swiper 11.2.10 (슬라이더)
  - Lexical 0.38.2 (리치 텍스트 에디터)
  - React Daum Postcode 3.2.0 (주소 검색)
  - Google Maps JS API Loader 2.0.2
  - Supabase 2.57.4 (파일 업로드)

### Development Tools

- **패키지 매니저**: pnpm
- **코드 품질**: ESLint
- **컴포넌트 개발**: Storybook 9.1.9
- **코드 생성**: GraphQL Code Generator 6.0.0

## 📁 프로젝트 구조

```
maincamp/
├── @commons/                    # 공통 UI 라이브러리
│   └── ui/
│       ├── src/
│       │   ├── button/         # 버튼 컴포넌트
│       │   ├── input/          # 입력 컴포넌트
│       │   ├── list/           # 리스트 컴포넌트
│       │   └── section/        # 섹션 컴포넌트
│       └── package.json
│
├── frontend/                    # 메인 애플리케이션
│   ├── public/
│   │   ├── icons/              # SVG 아이콘 (45개)
│   │   └── images/             # 이미지 리소스 (30개)
│   │
│   ├── src/
│   │   ├── app/                # Next.js App Router 페이지
│   │   │   ├── (auth)/         # 인증 페이지 그룹
│   │   │   │   ├── login/      # 로그인
│   │   │   │   └── signup/     # 회원가입
│   │   │   ├── boards/         # 게시판
│   │   │   │   ├── [boardId]/  # 게시글 상세/수정
│   │   │   │   └── new/        # 새 게시글 작성
│   │   │   ├── products/       # 상품 관리
│   │   │   │   ├── [productId]/ # 상품 상세
│   │   │   │   └── new/        # 새 상품 등록
│   │   │   ├── mypage/         # 마이페이지
│   │   │   ├── myapis/         # 여행 경비 관리
│   │   │   ├── mytrip/         # 여행 기록
│   │   │   └── openapis/       # 외부 API 테스트
│   │   │
│   │   ├── components/         # 컴포넌트
│   │   │   ├── features/       # 기능별 컴포넌트
│   │   │   │   ├── boards/     # 게시판 관련
│   │   │   │   │   ├── boards-detail/   # 상세 페이지
│   │   │   │   │   ├── boards-list/     # 목록 페이지
│   │   │   │   │   └── boards-write/    # 작성 페이지
│   │   │   │   ├── products/   # 상품 관련
│   │   │   │   │   ├── products-detail/ # 상세 페이지
│   │   │   │   │   ├── products-list/   # 목록 페이지
│   │   │   │   │   └── products-write/  # 등록 페이지
│   │   │   ├── myapis-list/    # 여행 경비 관리
│   │   │   ├── mypage/         # 마이페이지 섹션
│   │   │   ├── mytrip/         # 여행 기록
│   │   │   ├── users/          # 사용자 인증
│   │   │   └── ui/             # 공통 UI 컴포넌트
│   │   │
│   │   ├── commons/            # 공통 모듈
│   │   │   ├── graphql/        # GraphQL 타입 및 유틸
│   │   │   ├── hocs/           # HOC (withAuth 등)
│   │   │   ├── layout/         # 레이아웃 컴포넌트
│   │   │   ├── libraries/      # 외부 라이브러리 설정
│   │   │   ├── settings/       # Apollo 설정
│   │   │   └── stores/         # Zustand 스토어
│   │   │
│   │   ├── graphql/            # GraphQL 쿼리/뮤테이션
│   │   │   ├── mutations/      # 뮤테이션
│   │   │   └── queries/        # 쿼리
│   │   │
│   │   └── types/              # TypeScript 타입 정의
│   │
│   ├── codegen.ts              # GraphQL Codegen 설정
│   ├── next.config.mjs         # Next.js 설정
│   ├── tailwind.config.ts      # Tailwind 설정
│   └── tsconfig.json           # TypeScript 설정
│
└── pnpm-workspace.yaml         # pnpm 워크스페이스 설정
```

## 🚀 설치 및 실행

### 필수 요구사항

- Node.js 20 이상
- pnpm 패키지 매니저

### 설치

```bash
# 저장소 클론
cd maincamp

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 프론트엔드 개발 서버 (localhost:3000)
cd frontend
pnpm dev

# Storybook 실행 (localhost:6006)
cd @commons/ui
pnpm storybook
```

### 빌드

```bash
# 프로덕션 빌드
cd frontend
pnpm build

# 빌드 결과물 실행
pnpm start
```

### GraphQL Code Generation

```bash
cd frontend
pnpm codegen
```

## 🎨 주요 기능

### 1. 사용자 인증
- ✅ 회원가입 (이메일, 비밀번호, 이름)
- ✅ 로그인 (JWT 토큰 기반)
- ✅ 인증 상태 관리 (Zustand)

### 2. 게시판
- ✅ 게시글 목록 조회 (페이지네이션, 검색)
- ✅ 게시글 상세 조회
- ✅ 게시글 작성/수정/삭제
- ✅ 댓글 작성/수정/삭제
- ✅ 좋아요 기능
- ✅ 베스트 게시글
- ✅ YouTube 동영상 임베딩
- ✅ 이미지 업로드 (Supabase)

### 3. 상품 관리
- ✅ 상품 목록 조회
- ✅ 상품 상세 조회
- ✅ 상품 등록/수정
- ✅ 상품 이미지 업로드
- ✅ 베스트 상품
- ✅ 상품 배너

### 4. 마이페이지
- ✅ 사용자 정보 관리
- ✅ 비밀번호 변경
- ✅ 포인트 조회
- ✅ 내가 판매한 상품 조회

### 5. 여행 경비 관리 (My APIs)
- ✅ 여행 목록 조회
- ✅ 여행 등록/수정/삭제
- ✅ 여행 경비 내역 관리
- ✅ 지출 항목 추가/수정/삭제

### 6. 외부 API 연동
- ✅ Pokemon API 연동 예제
- ✅ Google Maps API 연동 (상품 위치 표시)

## 💻 개발 가이드

### 컴포넌트 구조

각 기능별 컴포넌트는 다음과 같은 구조를 따릅니다:

```
feature-name/
├── index.tsx           # 메인 컴포넌트
├── hook.ts             # 커스텀 훅 (비즈니스 로직)
├── schema.ts           # Zod 검증 스키마
├── types.ts            # TypeScript 타입
└── styles.module.css   # CSS 모듈
```

### GraphQL 사용법

1. **쿼리/뮤테이션 작성** (`src/graphql/`)

```typescript
// queries/board.ts
import { graphql } from "@/commons/graphql";

export const FETCH_BOARDS = graphql(`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
      writer
      createdAt
    }
  }
`);
```

2. **코드 생성**

```bash
pnpm codegen
```

3. **컴포넌트에서 사용**

```typescript
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "@/graphql/queries/board";

const { data } = useQuery(FETCH_BOARDS, {
  variables: { page: 1 }
});
```

### 폼 검증

Zod 스키마를 사용하여 폼 검증을 수행합니다:

```typescript
// schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다")
});

// hook.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(loginSchema)
});
```

### 상태 관리

Zustand를 사용한 전역 상태 관리:

```typescript
// stores/accessTokenStore.ts
import { create } from "zustand";

type AccessTokenStore = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};

export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token })
}));
```

### 파일 업로드

Supabase를 사용한 파일 업로드:

```typescript
import { supabase } from "@/commons/libraries/supabase";

const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("bucket-name")
    .upload(`path/${file.name}`, file);
  
  return data?.path;
};
```

## 📐 코딩 컨벤션

이 프로젝트는 엄격한 코딩 가이드라인을 따릅니다. 자세한 내용은 `.cursorrules`를 참고하세요.

### CSS 규칙

- ✅ **CSS Modules만 사용** (전역 CSS 금지)
- ✅ `:global`, `:root`, `!important` 사용 금지
- ✅ Flexbox 레이아웃만 사용 (position: absolute 금지)
- ✅ 애니메이션 최소화

### JavaScript/TypeScript 규칙

- ✅ 각 컴포넌트는 독립적으로 동작해야 함
- ✅ `useState`, `useEffect` 최소화
- ✅ 페이지 이동은 상수(`src/commons/constants/url.ts`)를 통해서만
- ✅ 타입 정의는 ENUM(`src/commons/constants/enum.ts`) 활용

### 폴더/파일 명명 규칙

- 컴포넌트 폴더: `kebab-case`
- 컴포넌트 파일: `index.tsx` (메인), `hook.ts` (로직)
- CSS 파일: `styles.module.css`
- 타입 파일: `types.ts`
- 스키마 파일: `schema.ts`

### GraphQL 규칙

- Apollo Client 사용
- GraphQL Codegen으로 타입 자동 생성
- 쿼리/뮤테이션은 별도 파일로 분리

## 📝 API 엔드포인트

**GraphQL API**: `http://main-practice.codebootcamp.co.kr/graphql`

주요 API:
- 인증: `login`, `createUser`
- 게시판: `fetchBoards`, `createBoard`, `updateBoard`, `deleteBoard`
- 댓글: `createBoardComment`, `updateBoardComment`, `deleteBoardComment`
- 상품: `fetchUsedItems`, `createUsedItem`, `updateUsedItem`, `deleteUsedItem`
- 파일: `uploadFile`

## 🔐 인증 플로우

1. 로그인 → JWT 토큰 발급
2. 토큰을 Zustand 스토어에 저장
3. Apollo Client의 context를 통해 모든 요청에 토큰 포함
4. `withAuth` HOC를 통한 페이지 권한 보호

## 🎨 UI 컴포넌트 라이브러리

`@commons/ui` 패키지에서 재사용 가능한 컴포넌트를 제공합니다:

- **Button**: 다양한 스타일의 버튼
- **Input**: 폼 입력 필드
- **List**: 데이터 리스트
- **Section**: 섹션 레이아웃

Storybook에서 컴포넌트 미리보기 및 문서 확인 가능합니다.

## 🐛 트러블슈팅

### GraphQL 타입 오류

```bash
# GraphQL 스키마 재생성
pnpm codegen
```

### 빌드 오류

```bash
# 캐시 삭제 후 재빌드
rm -rf .next
pnpm build
```

### 스타일이 적용되지 않음

- CSS Module 임포트 확인
- 클래스명이 camelCase로 변환되었는지 확인

## 📚 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Apollo Client 문서](https://www.apollographql.com/docs/react/)
- [React Hook Form 문서](https://react-hook-form.com/)
- [Zod 문서](https://zod.dev/)
- [Storybook 문서](https://storybook.js.org/)

## 👥 기여

이 프로젝트는 SeSAC 교육 과정의 일환으로 개발되었습니다.

## 📄 라이선스

Private - 교육용 프로젝트








