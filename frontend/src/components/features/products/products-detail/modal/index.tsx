"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@commons/ui";
import styles from "./styles.module.css";

interface ProductPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ProductPurchaseModal({
  isOpen,
  onClose,
  onConfirm,
}: ProductPurchaseModalProps) {
  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} data-testid="modal-backdrop">
      <div className={styles.popup} data-testid="modal-popup">
        <div className={styles.content}>
          <h2 className={styles.title} data-testid="modal-title">
            해당 숙박권을 구매 하시겠어요?
          </h2>
          <p className={styles.description} data-testid="modal-description">
            해당 숙박권은 포인트로만 구매 가능합니다.
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="modalBtn" type="button" onClick={onClose}>
            취소
          </Button>
          <Button variant="modalBtn" type="submit" onClick={onConfirm}>
            구매
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

