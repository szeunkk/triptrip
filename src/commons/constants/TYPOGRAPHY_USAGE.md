# Typography Token 사용 가이드

## 개요

프로젝트 전체에서 일관된 타이포그래피를 사용하기 위한 토큰 시스템입니다.
Pretendard 폰트를 기본으로 사용하며, 추후 영문 전용 폰트로 확장 가능합니다.

## 피그마 연동 정보

- **피그마 파운데이션 노드 ID**: 11020:26301
- **채널명**: m98xylm5
- **파일 경로**: `src/commons/constants/typography.ts`

---

## 사용 방법

### 1. CSS 클래스 사용 (권장)

가장 간단하고 직관적인 방법입니다.

```tsx
// Heading 사용
<h1 className="typo-heading-h1">메인 제목</h1>
<h2 className="typo-heading-h2">서브 제목</h2>
<h3 className="typo-heading-h3">소제목</h3>

// Body 텍스트 사용
<p className="typo-body16-regular">일반 본문 텍스트입니다.</p>
<span className="typo-body16-medium">강조된 텍스트입니다.</span>
<div className="typo-body14-regular">작은 본문 텍스트입니다.</div>

// Caption 사용
<small className="typo-caption12-regular">작은 설명 텍스트</small>
<span className="typo-caption11-medium">매우 작은 라벨</span>
```

### 2. CSS 변수 직접 사용

CSS 파일이나 인라인 스타일에서 사용할 수 있습니다.

```css
.custom-title {
  font: var(--typo-heading-h1);
  color: var(--color-text-primary);
}

.custom-description {
  font: var(--typo-body14-regular);
}
```

### 3. TypeScript 객체 사용

스타일을 동적으로 생성해야 할 때 사용합니다.

```tsx
import { typography } from "@/commons/constants/typography";

const MyComponent = () => {
  return (
    <div
      style={{
        fontFamily: typography.heading.h1.fontFamily,
        fontWeight: typography.heading.h1.fontWeight,
        fontSize: `${typography.heading.h1.fontSize}px`,
        lineHeight: `${typography.heading.h1.lineHeight}px`,
      }}
    >
      동적 스타일 적용
    </div>
  );
};
```

### 4. 유틸리티 함수 사용

```tsx
import {
  typography,
  getTypographyStyles,
} from "@/commons/constants/typography";

const MyComponent = () => {
  const styles = getTypographyStyles(typography.body16.regular);

  return <div style={{ styles }}>스타일 적용</div>;
};
```

---

## 타이포그래피 토큰 목록

### Heading (제목)

| 토큰명       | CSS 클래스        | 폰트            | 크기 | 줄높이 | 용도               |
| ------------ | ----------------- | --------------- | ---- | ------ | ------------------ |
| `heading.h1` | `typo-heading-h1` | Pretendard Bold | 28px | 36px   | 페이지 메인 타이틀 |
| `heading.h2` | `typo-heading-h2` | Pretendard Bold | 24px | 32px   | 섹션 타이틀        |
| `heading.h3` | `typo-heading-h3` | Pretendard Bold | 20px | 28px   | 서브섹션 타이틀    |

### Body 20px

| 토큰명           | CSS 클래스            | 폰트                        | 크기 | 줄높이 | 용도         |
| ---------------- | --------------------- | --------------------------- | ---- | ------ | ------------ |
| `body20.medium`  | `typo-body20-medium`  | Pretendard Variable Medium  | 20px | 24px   | 큰 본문 강조 |
| `body20.regular` | `typo-body20-regular` | Pretendard Variable Regular | 20px | 24px   | 큰 본문 일반 |

### Body 18px

| 토큰명            | CSS 클래스             | 폰트                         | 크기 | 줄높이 | 용도           |
| ----------------- | ---------------------- | ---------------------------- | ---- | ------ | -------------- |
| `body18.semibold` | `typo-body18-semibold` | Pretendard Variable SemiBold | 18px | 24px   | 중간 본문 강조 |

### Body 16px (가장 많이 사용)

| 토큰명                 | CSS 클래스                   | 폰트                         | 크기 | 줄높이 | 용도                         |
| ---------------------- | ---------------------------- | ---------------------------- | ---- | ------ | ---------------------------- |
| `body16.bold`          | `typo-body16-bold`           | Pretendard Variable Bold     | 16px | 24px   | 본문 강조 (굵게)             |
| `body16.semibold`      | `typo-body16-semibold`       | Pretendard Variable SemiBold | 16px | 24px   | 본문 강조                    |
| `body16.medium`        | `typo-body16-medium`         | Pretendard Variable Medium   | 16px | 24px   | 본문 중간 강조               |
| `body16.mediumCompact` | `typo-body16-medium-compact` | Pretendard Variable Medium   | 16px | 20px   | 본문 중간 강조 (줄간격 좁음) |
| `body16.regular`       | `typo-body16-regular`        | Pretendard Variable Regular  | 16px | 24px   | 본문 기본                    |

### Body 14px (기본 본문)

| 토큰명            | CSS 클래스             | 폰트                         | 크기 | 줄높이 | 용도                |
| ----------------- | ---------------------- | ---------------------------- | ---- | ------ | ------------------- |
| `body14.bold`     | `typo-body14-bold`     | Pretendard Variable Bold     | 14px | 20px   | 작은 본문 강조      |
| `body14.semibold` | `typo-body14-semibold` | Pretendard Variable SemiBold | 14px | 20px   | 작은 본문 중간 강조 |
| `body14.medium`   | `typo-body14-medium`   | Pretendard Variable Medium   | 14px | 20px   | 작은 본문 중간      |
| `body14.regular`  | `typo-body14-regular`  | Pretendard Variable Regular  | 14px | 20px   | 작은 본문 기본      |
| `body14.light`    | `typo-body14-light`    | Pretendard Variable Light    | 14px | 20px   | 작은 본문 연한      |

### Caption 13px

| 토큰명             | CSS 클래스              | 폰트                       | 크기 | 줄높이 | 용도             |
| ------------------ | ----------------------- | -------------------------- | ---- | ------ | ---------------- |
| `caption13.medium` | `typo-caption13-medium` | Pretendard Variable Medium | 13px | 20px   | 보조 설명 텍스트 |

### Caption 12px

| 토큰명              | CSS 클래스               | 폰트                        | 크기 | 줄높이 | 용도                   |
| ------------------- | ------------------------ | --------------------------- | ---- | ------ | ---------------------- |
| `caption12.medium`  | `typo-caption12-medium`  | Pretendard Variable Medium  | 12px | 20px   | 작은 라벨, 보조 텍스트 |
| `caption12.regular` | `typo-caption12-regular` | Pretendard Variable Regular | 12px | 20px   | 작은 본문 텍스트       |
| `caption12.light`   | `typo-caption12-light`   | Pretendard Variable Light   | 12px | 20px   | 작은 연한 텍스트       |

### Caption 11px

| 토큰명              | CSS 클래스               | 폰트                        | 크기 | 줄높이 | 용도             |
| ------------------- | ------------------------ | --------------------------- | ---- | ------ | ---------------- |
| `caption11.medium`  | `typo-caption11-medium`  | Pretendard Variable Medium  | 11px | 12px   | 매우 작은 라벨   |
| `caption11.regular` | `typo-caption11-regular` | Pretendard Variable Regular | 11px | 12px   | 매우 작은 텍스트 |

---

## 실전 사용 예제

### 카드 컴포넌트 예제

```tsx
const TripCard = ({ title, description, price, location }) => {
  return (
    <div className="card">
      <h3 className="typo-heading-h3">{title}</h3>
      <p className="typo-body14-regular text-secondary">{description}</p>
      <div className="flex justify-between items-center">
        <span className="typo-body16-bold text-primary">{price}원</span>
        <span className="typo-caption12-regular text-tertiary">{location}</span>
      </div>
    </div>
  );
};
```

### 폼 입력 예제

```tsx
const FormField = ({ label, error, helperText }) => {
  return (
    <div>
      <label className="typo-body14-medium">{label}</label>
      <input className="typo-body16-regular" />
      {error && (
        <span className="typo-caption12-regular text-color-error">{error}</span>
      )}
      {helperText && (
        <span className="typo-caption11-regular text-tertiary">
          {helperText}
        </span>
      )}
    </div>
  );
};
```

### 버튼 예제

```tsx
// 큰 버튼
<button className="typo-body16-semibold">확인</button>

// 중간 버튼
<button className="typo-body14-medium">취소</button>

// 작은 버튼
<button className="typo-caption12-medium">더보기</button>
```

---

## 영문 전용 폰트 사용 (추후 확장)

현재는 한글 폰트(Pretendard)를 영문에도 동일하게 사용하지만,
추후 영문 전용 폰트가 필요할 경우 `typographyEn` 객체를 수정하여 사용할 수 있습니다.

```typescript
// typography.ts
export const typographyEn = {
  heading: {
    h1: {
      fontFamily: "Inter", // 영문 전용 폰트로 변경
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: -0.5, // 영문 최적화
    },
    // ...
  },
} as const;
```

```tsx
// 사용 예제
import { typographyEn } from "@/commons/constants/typography";

<h1 lang="en" style={{ ...typographyEn.heading.h1 }}>
  English Title
</h1>;
```

---

## 색상과 함께 사용하기

타이포그래피는 색상 토큰과 함께 사용하면 더욱 효과적입니다.

```tsx
// Semantic 색상과 조합
<h1 className="typo-heading-h1 text-primary">메인 제목</h1>
<p className="typo-body14-regular text-secondary">설명 텍스트</p>
<span className="typo-caption12-regular text-tertiary">보조 텍스트</span>

// 에러 표시
<p className="typo-body14-regular text-color-error">오류 메시지</p>

// 비활성화 상태
<button className="typo-body16-medium text-disabled" disabled>
  비활성 버튼
</button>
```

---

## 주의사항

1. **일관성 유지**: 항상 정의된 타이포그래피 토큰을 사용하세요. 임의의 크기나 폰트를 사용하지 마세요.
2. **계층 구조**: heading > body > caption 순서로 중요도가 낮아집니다.
3. **줄높이**: `lineHeight`는 가독성을 위해 설정되어 있으므로 임의로 변경하지 마세요.
4. **폰트 로딩**: Pretendard 폰트가 프로젝트에 올바르게 로드되어 있는지 확인하세요.
5. **반응형**: 필요시 미디어 쿼리와 함께 사용하되, 토큰은 유지하세요.

```css
/* 좋은 예 */
@media (max-width: 768px) {
  .title {
    font: var(--typo-heading-h2); /* h1 대신 h2 사용 */
  }
}

/* 나쁜 예 */
@media (max-width: 768px) {
  .title {
    font-size: 20px; /* 임의의 크기 사용 */
  }
}
```

---

## 토큰 업데이트

피그마에서 디자인이 변경된 경우:

1. 피그마 채널에 접속: `m98xylm5`
2. 노드 ID `11020:26301`에서 최신 스타일 확인
3. `typography.ts` 파일 업데이트
4. `globals.css`의 CSS 변수 업데이트

---

## 참고 파일

- **토큰 정의**: `src/commons/constants/typography.ts`
- **CSS 변수**: `src/app/globals.css`
- **색상 토큰**: `src/commons/constants/color.ts`
- **색상 가이드**: `src/commons/constants/COLOR_USAGE.md`
