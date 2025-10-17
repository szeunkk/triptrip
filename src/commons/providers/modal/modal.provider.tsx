"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

// Modal Context 타입 정의
interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

// Context 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider Props 타입
interface ModalProviderProps {
  children: ReactNode;
}

/**
 * Modal Provider
 * React Portal을 사용하여 modal을 body에 렌더링합니다.
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Portal 요소 생성 (클라이언트 사이드에서만)
  useEffect(() => {
    let modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }

    setPortalElement(modalRoot);

    return () => {
      // cleanup: modal이 열려있지 않으면 portal element 제거
      if (modalRoot && !modalRoot.hasChildNodes()) {
        modalRoot.remove();
      }
    };
  }, []);

  // Modal 열기
  const openModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
    // body 스크롤 방지
    document.body.style.overflow = "hidden";
  }, []);

  // Modal 닫기
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    // body 스크롤 복원
    document.body.style.overflow = "unset";
  }, []);

  // ESC 키로 modal 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  const value: ModalContextType = {
    isOpen,
    content,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen &&
        portalElement &&
        createPortal(
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              {content}
            </div>
          </div>,
          portalElement
        )}
    </ModalContext.Provider>
  );
}

/**
 * useModal Hook
 * Modal context를 사용하기 위한 커스텀 훅
 */
export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
