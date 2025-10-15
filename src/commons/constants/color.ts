/**
 * Color Token System
 * 프로젝트 전체에서 사용될 색상 토큰을 정의합니다.
 * 다크모드를 포함한 모든 테마에서 사용 가능하도록 설계되었습니다.
 */

export const colors = {
  // Gray Scale
  gray: {
    white: "#FFFFFF",
    gray05: "#F2F2F2",
    gray10: "#E4E4E4",
    gray20: "#D4D3D3", // Disabled
    gray30: "#C7C7C7",
    gray40: "#ABABAB",
    gray50: "#919191",
    gray60: "#777777",
    gray70: "#5F5F5F",
    gray80: "#333333",
    gray90: "#1C1C1C",
    black: "#000000",
  },

  // Brand Colors
  brand: {
    blue: "#2974E5", // Main
    red: "#F66A6A",
  },

  // Semantic Colors (라이트 모드)
  semantic: {
    primary: "#2974E5",
    error: "#F66A6A",
    disabled: "#D4D3D3",
    background: {
      primary: "#FFFFFF",
      secondary: "#F2F2F2",
      tertiary: "#E4E4E4",
    },
    text: {
      primary: "#000000",
      secondary: "#5F5F5F",
      tertiary: "#777777",
      disabled: "#ABABAB",
      inverse: "#FFFFFF",
    },
    border: {
      primary: "#E4E4E4",
      secondary: "#C7C7C7",
    },
  },

  // Dark Mode Semantic Colors
  semanticDark: {
    primary: "#2974E5",
    error: "#F66A6A",
    disabled: "#5F5F5F",
    background: {
      primary: "#000000",
      secondary: "#1C1C1C",
      tertiary: "#333333",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#C7C7C7",
      tertiary: "#ABABAB",
      disabled: "#777777",
      inverse: "#000000",
    },
    border: {
      primary: "#333333",
      secondary: "#5F5F5F",
    },
  },
} as const;

export type ColorToken = typeof colors;

// CSS 변수명 매핑
export const cssVariableNames = {
  // Gray
  "gray-white": "--color-gray-white",
  "gray-05": "--color-gray-05",
  "gray-10": "--color-gray-10",
  "gray-20": "--color-gray-20",
  "gray-30": "--color-gray-30",
  "gray-40": "--color-gray-40",
  "gray-50": "--color-gray-50",
  "gray-60": "--color-gray-60",
  "gray-70": "--color-gray-70",
  "gray-80": "--color-gray-80",
  "gray-90": "--color-gray-90",
  "gray-black": "--color-gray-black",

  // Brand
  "brand-blue": "--color-brand-blue",
  "brand-red": "--color-brand-red",

  // Semantic
  primary: "--color-primary",
  error: "--color-error",
  disabled: "--color-disabled",

  // Background
  "bg-primary": "--color-bg-primary",
  "bg-secondary": "--color-bg-secondary",
  "bg-tertiary": "--color-bg-tertiary",

  // Text
  "text-primary": "--color-text-primary",
  "text-secondary": "--color-text-secondary",
  "text-tertiary": "--color-text-tertiary",
  "text-disabled": "--color-text-disabled",
  "text-inverse": "--color-text-inverse",

  // Border
  "border-primary": "--color-border-primary",
  "border-secondary": "--color-border-secondary",
} as const;
