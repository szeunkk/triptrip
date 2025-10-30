/**
 * URL Route System
 * 프로젝트 전체에서 사용될 URL 경로 및 페이지 메타데이터를 정의합니다.
 * 다이나믹 라우팅과 접근 권한 관리 기능을 포함합니다.
 */

// Type Definitions

/** 접근 권한 타입 */
export type AccessType = "누구나" | "회원전용";

/** 레이아웃 구성 요소 */
export interface LayoutConfig {
  /** 헤더 노출 여부 */
  header: {
    /** 헤더 노출 */
    visible: boolean;
    /** 로고 노출 */
    logo: boolean;
    /** 로그인 버튼 노출 */
    loginButton: boolean;
  };
  /** 배너 노출 여부 */
  banner: boolean;
  /** 히어로이미지 노출 여부 */
  heroimage: boolean;
}

/** 페이지 메타데이터 */
export interface PageMetadata {
  /** 접근 가능 상태 */
  access: AccessType;
  /** 레이아웃 구성 */
  layout: LayoutConfig;
}

/** 정적 페이지 URL 인터페이스 */
export interface StaticPage {
  /** URL 경로 */
  path: string;
  /** 페이지 메타데이터 */
  metadata: PageMetadata;
}

/** 다이나믹 페이지 URL 인터페이스 */
export interface DynamicPage {
  /** URL 생성 함수 */
  path: (...args: string[]) => string;
  /** 페이지 메타데이터 */
  metadata: PageMetadata;
  /** 원본 패턴 (디버깅/참조용) */
  pattern: string;
}

// Layout Presets

/** 헤더/배너 모두 비노출 (인증 페이지) */
const LAYOUT_AUTH: LayoutConfig = {
  header: {
    visible: false,
    logo: false,
    loginButton: false,
  },
  banner: false,
  heroimage: true,
};

/** 헤더 노출, 배너 노출 (공개 목록 페이지) */
const LAYOUT_PUBLIC_LIST: LayoutConfig = {
  header: {
    visible: true,
    logo: true,
    loginButton: false,
  },
  banner: true,
  heroimage: false,
};

/** 헤더 노출, 배너 비노출 (등록/수정 페이지) */
const LAYOUT_FORM: LayoutConfig = {
  header: {
    visible: true,
    logo: true,
    loginButton: false,
  },
  banner: false,
  heroimage: false,
};

/** 헤더 노출, 배너 노출 (상세 페이지) */
const LAYOUT_DETAIL: LayoutConfig = {
  header: {
    visible: true,
    logo: true,
    loginButton: false,
  },
  banner: true,
  heroimage: false,
};

// URL Routes and Metadata

export const url = {
  // 인증 관련
  auth: {
    /** 로그인 */
    login: {
      path: "/login",
      metadata: {
        access: "누구나" as AccessType,
        layout: LAYOUT_AUTH,
      },
    } as StaticPage,

    /** 회원가입 */
    signup: {
      path: "/signup",
      metadata: {
        access: "누구나" as AccessType,
        layout: LAYOUT_AUTH,
      },
    } as StaticPage,
  },

  // 게시글 관련
  boards: {
    /** 게시글 목록 */
    list: {
      path: "/boards",
      metadata: {
        access: "누구나" as AccessType,
        layout: LAYOUT_PUBLIC_LIST,
      },
    } as StaticPage,

    /** 게시글 등록 */
    new: {
      path: "/boards/new",
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
    } as StaticPage,

    /** 게시글 상세 */
    detail: {
      path: (boardId: string) => `/boards/${boardId}`,
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_DETAIL,
      },
      pattern: "/boards/[boardId]",
    } as DynamicPage,

    /** 게시글 수정 */
    edit: {
      path: (boardId: string) => `/boards/${boardId}/edit`,
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
      pattern: "/boards/[boardId]/edit",
    } as DynamicPage,
  },

  // 숙박권 관련
  products: {
    /** 숙박권 목록 */
    list: {
      path: "/products",
      metadata: {
        access: "누구나" as AccessType,
        layout: LAYOUT_PUBLIC_LIST,
      },
    } as StaticPage,

    /** 숙박권 등록 */
    new: {
      path: "/products/new",
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
    } as StaticPage,

    /** 숙박권 상세 */
    detail: {
      path: (productId: string) => `/products/${productId}`,
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
      pattern: "/products/[productId]",
    } as DynamicPage,

    /** 숙박권 수정 */
    edit: {
      path: (productId: string) => `/products/${productId}/edit`,
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
      pattern: "/products/[productId]/edit",
    } as DynamicPage,
  },

  // 마이페이지
  mypage: {
    /** 마이페이지 */
    main: {
      path: "/mypage",
      metadata: {
        access: "회원전용" as AccessType,
        layout: LAYOUT_FORM,
      },
    } as StaticPage,
  },
} as const;

export type UrlToken = typeof url;

// Utility Functions

/**
 * 페이지 URL이 회원 전용인지 확인
 * @param pathname 현재 페이지 경로
 * @returns 회원 전용 여부
 */
export const isAuthRequired = (pathname: string): boolean => {
  // 모든 URL을 순회하며 매칭되는 메타데이터 찾기
  const checkPages = (obj: Record<string, unknown>): boolean | null => {
    for (const key in obj) {
      const page = obj[key];

      // 정적 페이지 확인
      if (
        page &&
        typeof page === "object" &&
        "path" in page &&
        typeof page.path === "string"
      ) {
        if (
          pathname === page.path &&
          "metadata" in page &&
          typeof page.metadata === "object" &&
          page.metadata &&
          "access" in page.metadata
        ) {
          return page.metadata.access === "회원전용";
        }
      }

      // 다이나믹 페이지 확인
      if (
        page &&
        typeof page === "object" &&
        "pattern" in page &&
        typeof page.pattern === "string"
      ) {
        const regex = new RegExp(
          "^" + page.pattern.replace(/\[.*?\]/g, "[^/]+") + "$"
        );
        if (
          regex.test(pathname) &&
          "metadata" in page &&
          typeof page.metadata === "object" &&
          page.metadata &&
          "access" in page.metadata
        ) {
          return page.metadata.access === "회원전용";
        }
      }

      // 중첩된 객체 재귀 검사
      if (
        typeof page === "object" &&
        page !== null &&
        !("path" in page) &&
        !("pattern" in page)
      ) {
        const result = checkPages(page as Record<string, unknown>);
        if (result !== null) return result;
      }
    }
    return null;
  };

  return checkPages(url) ?? false;
};

/**
 * 페이지의 레이아웃 구성 정보 가져오기
 * @param pathname 현재 페이지 경로
 * @returns 레이아웃 구성 정보 (없으면 기본값)
 */
export const getLayoutConfig = (pathname: string): LayoutConfig => {
  // 모든 URL을 순회하며 매칭되는 메타데이터 찾기
  const checkPages = (obj: Record<string, unknown>): LayoutConfig | null => {
    for (const key in obj) {
      const page = obj[key];

      // 정적 페이지 확인
      if (
        page &&
        typeof page === "object" &&
        "path" in page &&
        typeof page.path === "string"
      ) {
        if (
          pathname === page.path &&
          "metadata" in page &&
          typeof page.metadata === "object" &&
          page.metadata &&
          "layout" in page.metadata
        ) {
          return page.metadata.layout as LayoutConfig;
        }
      }

      // 다이나믹 페이지 확인
      if (
        page &&
        typeof page === "object" &&
        "pattern" in page &&
        typeof page.pattern === "string"
      ) {
        const regex = new RegExp(
          "^" + page.pattern.replace(/\[.*?\]/g, "[^/]+") + "$"
        );
        if (
          regex.test(pathname) &&
          "metadata" in page &&
          typeof page.metadata === "object" &&
          page.metadata &&
          "layout" in page.metadata
        ) {
          return page.metadata.layout as LayoutConfig;
        }
      }

      // 중첩된 객체 재귀 검사
      if (
        typeof page === "object" &&
        page !== null &&
        !("path" in page) &&
        !("pattern" in page)
      ) {
        const result = checkPages(page as Record<string, unknown>);
        if (result !== null) return result;
      }
    }
    return null;
  };

  // 기본값 (모두 노출)
  const defaultLayout: LayoutConfig = {
    header: {
      visible: true,
      logo: true,
      loginButton: true,
    },
    banner: true,
    heroimage: false,
  };

  return checkPages(url) ?? defaultLayout;
};

/**
 * 모든 URL 경로 목록 가져오기 (테스트/디버깅용)
 * @returns URL 경로 배열
 */
export const getAllPaths = (): string[] => {
  const paths: string[] = [];

  const extractPaths = (obj: Record<string, unknown>) => {
    for (const key in obj) {
      const page = obj[key];

      if (
        page &&
        typeof page === "object" &&
        "path" in page &&
        typeof page.path === "string"
      ) {
        paths.push(page.path);
      }

      if (
        page &&
        typeof page === "object" &&
        "pattern" in page &&
        typeof page.pattern === "string"
      ) {
        paths.push(page.pattern);
      }

      if (
        typeof page === "object" &&
        page !== null &&
        !("path" in page) &&
        !("pattern" in page)
      ) {
        extractPaths(page as Record<string, unknown>);
      }
    }
  };

  extractPaths(url);
  return paths;
};
