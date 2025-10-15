# Color Token 사용 가이드

## 개요

이 프로젝트는 피그마 디자인 시스템에서 추출한 컬러 토큰을 사용합니다.
다크모드를 포함한 모든 테마에서 일관된 색상 사용이 가능합니다.

---

## 1. TypeScript에서 사용하기

### Import

```typescript
import { colors } from "@/commons/constants/color";
```

### 사용 예시

```typescript
// Gray 사용
const backgroundColor = colors.gray.white;
const textColor = colors.gray.black;

// Brand Color 사용
const primaryColor = colors.brand.blue;
const errorColor = colors.brand.red;

// Semantic Color 사용 (Light Mode)
const buttonColor = colors.semantic.primary;
const disabledColor = colors.semantic.disabled;

// Dark Mode
const darkBg = colors.semanticDark.background.primary;
```

---

## 2. CSS에서 사용하기

### CSS 변수로 직접 사용

```css
.my-component {
  /* Gray Scale */
  background-color: var(--color-gray-white);
  color: var(--color-gray-black);

  /* Brand Colors */
  border-color: var(--color-brand-blue);

  /* Semantic Colors (자동으로 다크모드 대응) */
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}
```

### Utility Classes 사용

```html
<!-- Gray Scale -->
<div class="bg-gray-white text-gray-black">White Background</div>
<div class="bg-gray-80 text-gray-white">Dark Background</div>

<!-- Brand Colors -->
<button class="bg-brand-blue text-gray-white">Primary Button</button>
<div class="text-brand-red">Error Message</div>

<!-- Semantic Colors -->
<div class="bg-primary text-primary">Auto Dark Mode Support</div>
<div class="bg-secondary text-secondary">Secondary Background</div>
```

---

## 3. Tailwind CSS에서 사용하기

### 기본 사용법

```tsx
// Gray Scale
<div className="bg-gray-white text-gray-black">
<div className="bg-gray-05 text-gray-90">
<div className="bg-gray-80 text-gray-white">

// Brand Colors
<button className="bg-brand-blue text-white">
<span className="text-brand-red">

// Semantic Colors
<div className="bg-primary text-primary">
<div className="bg-secondary text-secondary">
<div className="border border-primary">
```

### 다크모드 대응

Semantic color는 자동으로 다크모드를 지원합니다:

```tsx
// 라이트 모드: 흰색 배경 / 다크 모드: 검은색 배경
<div className="bg-primary text-primary">
  Content
</div>

// 라이트 모드: #F2F2F2 / 다크 모드: #1C1C1C
<div className="bg-secondary text-secondary">
  Content
</div>
```

---

## 4. 컬러 팔레트

### Gray Scale

| Name    | Light Mode | Usage                   |
| ------- | ---------- | ----------------------- |
| white   | #FFFFFF    | 배경, 텍스트(다크 배경) |
| gray-05 | #F2F2F2    | 보조 배경               |
| gray-10 | #E4E4E4    | 삼차 배경, 테두리       |
| gray-20 | #D4D3D3    | Disabled 상태           |
| gray-30 | #C7C7C7    | 보조 테두리             |
| gray-40 | #ABABAB    | Disabled 텍스트         |
| gray-50 | #919191    | -                       |
| gray-60 | #777777    | 삼차 텍스트             |
| gray-70 | #5F5F5F    | 이차 텍스트             |
| gray-80 | #333333    | -                       |
| gray-90 | #1C1C1C    | -                       |
| black   | #000000    | 주요 텍스트             |

### Brand Colors

| Name | Color   | Usage               |
| ---- | ------- | ------------------- |
| blue | #2974E5 | Primary, Main Color |
| red  | #F66A6A | Error, Alert        |

### Semantic Colors (자동 다크모드 대응)

| Token            | Light Mode | Dark Mode | Usage                |
| ---------------- | ---------- | --------- | -------------------- |
| primary          | #2974E5    | #2974E5   | Primary action       |
| error            | #F66A6A    | #F66A6A   | Error state          |
| disabled         | #D4D3D3    | #5F5F5F   | Disabled state       |
| bg-primary       | #FFFFFF    | #000000   | Main background      |
| bg-secondary     | #F2F2F2    | #1C1C1C   | Secondary background |
| bg-tertiary      | #E4E4E4    | #333333   | Tertiary background  |
| text-primary     | #000000    | #FFFFFF   | Main text            |
| text-secondary   | #5F5F5F    | #C7C7C7   | Secondary text       |
| text-tertiary    | #777777    | #ABABAB   | Tertiary text        |
| text-disabled    | #ABABAB    | #777777   | Disabled text        |
| text-inverse     | #FFFFFF    | #000000   | Inverse text         |
| border-primary   | #E4E4E4    | #333333   | Primary border       |
| border-secondary | #C7C7C7    | #5F5F5F   | Secondary border     |

---

## 5. 사용 권장사항

### ✅ 권장

- Semantic color 사용 (자동 다크모드 대응)
- CSS 변수 사용 (테마 변경 용이)
- 일관된 color token 사용

### ❌ 비권장

- 하드코딩된 hex 값 사용
- 임의의 색상 추가
- Semantic의미 없이 gray scale 직접 사용

### 예시

```tsx
// ✅ Good - Semantic color 사용
<div className="bg-primary text-primary">
  <button className="bg-brand-blue text-white">Submit</button>
</div>

// ❌ Bad - 하드코딩된 색상
<div style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
  <button style={{ backgroundColor: '#2974E5' }}>Submit</button>
</div>
```

---

## 6. 개발 체크리스트

- [ ] 새로운 컴포넌트 작성 시 color token 사용
- [ ] 하드코딩된 색상을 color token으로 변경
- [ ] 다크모드 지원이 필요한 경우 semantic color 사용
- [ ] 피그마 디자인과 일치하는지 확인
