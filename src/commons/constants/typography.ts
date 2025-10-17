/**
 * Typography Token System
 * 프로젝트 전체에서 사용될 타이포그래피 토큰을 정의합니다.
 * 한글(Pretendard)과 영문 폰트를 각각 관리할 수 있도록 설계되었습니다.
 */

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

/**
 * 한글/기본 타이포그래피 (Pretendard)
 * 피그마 Foundation: 11020:26301
 */
export const typography = {
  // Heading Styles
  heading: {
    h1: {
      fontFamily: "Pretendard",
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: "Pretendard",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: "Pretendard",
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
  },

  // Body Styles - 20px
  body20: {
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
    },
    regular: {
      fontFamily: "Pretendard Variable",
      fontWeight: 400,
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0,
    },
  },

  // Body Styles - 18px
  body18: {
    semibold: {
      fontFamily: "Pretendard Variable",
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
    },
  },

  // Body Styles - 16px
  body16: {
    bold: {
      fontFamily: "Pretendard Variable",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    semibold: {
      fontFamily: "Pretendard Variable",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    mediumCompact: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
    },
    regular: {
      fontFamily: "Pretendard Variable",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
  },

  // Body Styles - 14px
  body14: {
    bold: {
      fontFamily: "Pretendard Variable",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    semibold: {
      fontFamily: "Pretendard Variable",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    regular: {
      fontFamily: "Pretendard Variable",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    light: {
      fontFamily: "Pretendard Variable",
      fontWeight: 300,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
  },

  // Caption Styles - 13px
  caption13: {
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: 0,
    },
  },

  // Caption Styles - 12px
  caption12: {
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 12,
      lineHeight: 20,
      letterSpacing: 0,
    },
    regular: {
      fontFamily: "Pretendard Variable",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 20,
      letterSpacing: 0,
    },
    light: {
      fontFamily: "Pretendard Variable",
      fontWeight: 300,
      fontSize: 12,
      lineHeight: 20,
      letterSpacing: 0,
    },
  },

  // Caption Styles - 11px
  caption11: {
    medium: {
      fontFamily: "Pretendard Variable",
      fontWeight: 500,
      fontSize: 11,
      lineHeight: 12,
      letterSpacing: 0,
    },
    regular: {
      fontFamily: "Pretendard Variable",
      fontWeight: 400,
      fontSize: 11,
      lineHeight: 12,
      letterSpacing: 0,
    },
  },
} as const;

/**
 * 영문 타이포그래피 (추후 확장 가능)
 * 필요시 영문 전용 폰트를 여기에 정의할 수 있습니다.
 */
export const typographyEn = {
  // 영문 전용 폰트가 필요할 경우 여기에 추가
  // 예: fontFamily: "Inter" 등
  ...typography, // 현재는 기본 typography를 상속
} as const;

export type TypographyToken = typeof typography;
export type TypographyEnToken = typeof typographyEn;

/**
 * CSS 변수명 매핑
 */
export const cssVariableNames = {
  // Heading
  "heading-h1": "--typo-heading-h1",
  "heading-h2": "--typo-heading-h2",
  "heading-h3": "--typo-heading-h3",

  // Body 20px
  "body20-medium": "--typo-body20-medium",
  "body20-regular": "--typo-body20-regular",

  // Body 18px
  "body18-semibold": "--typo-body18-semibold",

  // Body 16px
  "body16-bold": "--typo-body16-bold",
  "body16-semibold": "--typo-body16-semibold",
  "body16-medium": "--typo-body16-medium",
  "body16-medium-compact": "--typo-body16-medium-compact",
  "body16-regular": "--typo-body16-regular",

  // Body 14px
  "body14-bold": "--typo-body14-bold",
  "body14-semibold": "--typo-body14-semibold",
  "body14-medium": "--typo-body14-medium",
  "body14-regular": "--typo-body14-regular",
  "body14-light": "--typo-body14-light",

  // Caption 13px
  "caption13-medium": "--typo-caption13-medium",

  // Caption 12px
  "caption12-medium": "--typo-caption12-medium",
  "caption12-regular": "--typo-caption12-regular",
  "caption12-light": "--typo-caption12-light",

  // Caption 11px
  "caption11-medium": "--typo-caption11-medium",
  "caption11-regular": "--typo-caption11-regular",
} as const;

/**
 * 타이포그래피 스타일을 CSS 문자열로 변환하는 유틸리티 함수
 */
export const getTypographyStyles = (style: TypographyStyle): string => {
  return `
    font-family: ${style.fontFamily};
    font-weight: ${style.fontWeight};
    font-size: ${style.fontSize}px;
    line-height: ${style.lineHeight}px;
    letter-spacing: ${style.letterSpacing}px;
  `.trim();
};

/**
 * Tailwind 클래스명 생성을 위한 유틸리티
 */
export const getTypographyClassName = (
  category: string,
  variant: string
): string => {
  return `typo-${category}-${variant}`;
};
