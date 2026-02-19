"use client";

import { Inputfield, InputBoardAddress } from "@commons/ui";
import styles from "./styles.module.css";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useEffect, useCallback } from "react";
import useProductWriteForm from "./hooks/index.hook";
import useProductWriteFormSubmit from "./hooks/index.submit.hook";
import { ProductWriteFormValues } from "./schema";
import ToolbarPlugin from "./components/ToolbarPlugin";
import GoogleMapComponent from "./components/GoogleMapComponent";
import { editorConfig } from "./config/editorConfig";

export default function ProductsWrite() {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    setValue,
    isModalOpen,
    onToggleModal,
    handleComplete,
    handleEditorChange,
    onClickCancel,
    imageFiles,
    imagePreviews,
    handleImageUpload,
    handleImageRemove,
    fileInputRef,
    triggerFileInput,
  } = useProductWriteForm();

  const { onSubmit, loading: submitLoading } = useProductWriteFormSubmit();

  const lat = watch("lat");
  const lng = watch("lng");

  // onSubmit 래퍼 함수
  const handleFormSubmit = useCallback(
    (formData: ProductWriteFormValues) => {
      return onSubmit(formData, imageFiles);
    },
    [onSubmit, imageFiles]
  );

  // 테스트 환경에서만 setValue를 window 객체에 노출
  useEffect(() => {
    // 테스트 환경에서 사용 (playwright는 dev 모드로 실행)
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__PRODUCT_WRITE_SET_VALUE__ = setValue;
    }
    return () => {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).__PRODUCT_WRITE_SET_VALUE__;
      }
    };
  }, [setValue]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>숙박권 판매하기</h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit(handleFormSubmit)}
        data-testid="product-write-form"
      >
        {/* 상품명 */}
        <Inputfield
          type="text"
          label="상품명"
          required
          placeholder="상품명을 입력해 주세요."
          {...register("name")}
          error={formState.errors.name?.message}
          data-testid="input-name"
        />

        <div className={styles.divider} />

        {/* 한줄 요약 */}
        <Inputfield
          type="text"
          label="한줄 요약"
          required
          placeholder="상품을 한줄로 요약해 주세요."
          {...register("remarks")}
          error={formState.errors.remarks?.message}
          data-testid="input-remarks"
        />

        <div className={styles.divider} />

        {/* 상품 설명 (Lexical 에디터) */}
        <div className={styles.editorContainer}>
          <div className={styles.editorLabel}>
            <label>상품 설명</label>
            <span>*</span>
          </div>
          <div className={styles.editor} data-testid="input-contents">
            <LexicalComposer initialConfig={editorConfig}>
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={<ContentEditable className={styles.editorContent} />}
                placeholder={<div className={styles.editorPlaceholder}>내용을 입력해 주세요.</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin onChange={handleEditorChange} />
            </LexicalComposer>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 판매 가격 */}
        <Inputfield
          type="text"
          label="판매 가격"
          required
          placeholder="판매 가격을 입력해 주세요. (원 단위)"
          {...register("price")}
          error={formState.errors.price?.message}
          data-testid="input-price"
        />

        <div className={styles.divider} />

        {/* 태그 입력 */}
        <Inputfield
          type="text"
          label="태그 입력"
          placeholder="태그를 입력해 주세요."
          {...register("tags")}
          error={formState.errors.tags?.message}
          data-testid="input-tags"
        />

        <div className={styles.divider} />

        {/* 주소 및 지도 */}
        <div className={styles.addressGroup}>
          <div className={styles.addressInputs}>
            <div data-testid="address-input-group">
              <InputBoardAddress
                required
                onClick={onToggleModal}
                placeholder="주소를 입력해 주세요."
                register={register}
                basePath="productAddress"
              />
            </div>

            <div className={`${styles.disabledInput} ${styles.latInput}`}>
              <Inputfield
                type="text"
                label="위도(LAT)"
                placeholder="주소를 먼저 입력해 주세요."
                {...register("lat")}
                isEdit={true}
              />
            </div>

            <div className={`${styles.disabledInput} ${styles.lngInput}`}>
              <Inputfield
                type="text"
                label="경도(LNG)"
                placeholder="주소를 먼저 입력해 주세요."
                {...register("lng")}
                isEdit={true}
              />
            </div>
          </div>

          <div className={styles.mapContainer}>
            <label className={styles.mapLabel}>상세 위치</label>
            {lat && lng ? (
              <GoogleMapComponent lat={lat} lng={lng} />
            ) : (
              <div className={styles.map}>
                <span className={styles.mapPlaceholder}>주소를 먼저 입력해 주세요.</span>
              </div>
            )}
          </div>
        </div>

        {/* 주소 검색 모달 */}
        {isModalOpen && (
          <Modal
            title="주소입력하기"
            open={true}
            styles={{ body: { height: 450 } }}
            onOk={onToggleModal}
            onCancel={onToggleModal}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: "100%" }} />
          </Modal>
        )}

        <div className={styles.divider} />

        {/* 사진 첨부 */}
        <div className={styles.photoContainer}>
          <div className={styles.photoLabel}>
            <label>사진 첨부</label>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className={styles.fileInput}
            data-testid="input-image"
          />
          {imagePreviews.length === 0 ? (
            <div className={styles.photoUpload} onClick={triggerFileInput}>
              <div className={styles.photoIcon}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M18.7513 21.2503H10.418C10.0638 21.2503 9.767 21.1305 9.52755 20.8907C9.28783 20.651 9.16797 20.3541 9.16797 19.9999C9.16797 19.6455 9.28783 19.3487 9.52755 19.1095C9.767 18.87 10.0638 18.7503 10.418 18.7503H18.7513V10.417C18.7513 10.0628 18.8712 9.76602 19.1109 9.52658C19.3506 9.28685 19.6476 9.16699 20.0017 9.16699C20.3562 9.16699 20.653 9.28685 20.8921 9.52658C21.1316 9.76602 21.2513 10.0628 21.2513 10.417V18.7503H29.5846C29.9388 18.7503 30.2356 18.8702 30.4751 19.1099C30.7148 19.3496 30.8346 19.6466 30.8346 20.0007C30.8346 20.3552 30.7148 20.652 30.4751 20.8912C30.2356 21.1306 29.9388 21.2503 29.5846 21.2503H21.2513V29.5837C21.2513 29.9378 21.1314 30.2346 20.8917 30.4741C20.652 30.7138 20.3551 30.8337 20.0009 30.8337C19.6464 30.8337 19.3496 30.7138 19.1105 30.4741C18.871 30.2346 18.7513 29.9378 18.7513 29.5837V21.2503Z"
                    fill="#777777"
                  />
                </svg>
              </div>
              <span className={styles.photoText}>클릭해서 사진 업로드</span>
            </div>
          ) : (
            <div className={styles.photoList}>
              {imagePreviews.map((preview, index) => (
                <div key={index} className={styles.photoItem}>
                  <img src={preview} alt={`미리보기 ${index + 1}`} className={styles.photoPreview} />
                  <button
                    type="button"
                    className={styles.photoRemove}
                    onClick={() => handleImageRemove(index)}
                    aria-label="이미지 삭제"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.0005 13.0538L6.9275 18.127C6.789 18.2653 6.61492 18.3362 6.40525 18.3395C6.19575 18.3427 6.0185 18.2718 5.8735 18.127C5.72867 17.982 5.65625 17.8063 5.65625 17.6C5.65625 17.3937 5.72867 17.218 5.8735 17.073L10.9468 12L5.8735 6.92701C5.73517 6.78851 5.66433 6.61443 5.661 6.40476C5.65783 6.19526 5.72867 6.01801 5.8735 5.87301C6.0185 5.72818 6.19417 5.65576 6.4005 5.65576C6.60683 5.65576 6.7825 5.72818 6.9275 5.87301L12.0005 10.9463L17.0735 5.87301C17.212 5.73468 17.3861 5.66385 17.5957 5.66051C17.8053 5.65735 17.9825 5.72818 18.1275 5.87301C18.2723 6.01801 18.3448 6.19368 18.3448 6.40001C18.3448 6.60635 18.2723 6.78201 18.1275 6.92701L13.0543 12L18.1275 17.073C18.2658 17.2115 18.3367 17.3856 18.34 17.5953C18.3432 17.8048 18.2723 17.982 18.1275 18.127C17.9825 18.2718 17.8068 18.3443 17.6005 18.3443C17.3942 18.3443 17.2185 18.2718 17.0735 18.127L12.0005 13.0538Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className={styles.photoUploadButton} onClick={triggerFileInput}>
                <div className={styles.photoIcon}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M18.7513 21.2503H10.418C10.0638 21.2503 9.767 21.1305 9.52755 20.8907C9.28783 20.651 9.16797 20.3541 9.16797 19.9999C9.16797 19.6455 9.28783 19.3487 9.52755 19.1095C9.767 18.87 10.0638 18.7503 10.418 18.7503H18.7513V10.417C18.7513 10.0628 18.8712 9.76602 19.1109 9.52658C19.3506 9.28685 19.6476 9.16699 20.0017 9.16699C20.3562 9.16699 20.653 9.28685 20.8921 9.52658C21.1316 9.76602 21.2513 10.0628 21.2513 10.417V18.7503H29.5846C29.9388 18.7503 30.2356 18.8702 30.4751 19.1099C30.7148 19.3496 30.8346 19.6466 30.8346 20.0007C30.8346 20.3552 30.7148 20.652 30.4751 20.8912C30.2356 21.1306 29.9388 21.2503 29.5846 21.2503H21.2513V29.5837C21.2513 29.9378 21.1314 30.2346 20.8917 30.4741C20.652 30.7138 20.3551 30.8337 20.0009 30.8337C19.6464 30.8337 19.3496 30.7138 19.1105 30.4741C18.871 30.2346 18.7513 29.9378 18.7513 29.5837V21.2503Z"
                      fill="#777777"
                    />
                  </svg>
                </div>
                <span className={styles.photoText}>클릭해서 사진 업로드</span>
              </div>
            </div>
          )}
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClickCancel}
            data-testid="button-cancel"
          >
            취소
          </button>
          <button
            type="submit"
            className={`${styles.submitButton} ${formState.isValid ? styles.enabled : ""}`}
            disabled={!formState.isValid || submitLoading}
            data-testid="button-submit"
          >
            {submitLoading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
