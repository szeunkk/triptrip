import Image from "next/image";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IUploadImages {
  images: (string | null | undefined)[];
  onClickDelete: (index: number) => void;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>, index: number) => Promise<void>;
}

export default function UploadImages({ images, onClickDelete, onChangeFile }: IUploadImages) {
  const fixedImages = [...images, "", "", ""].slice(0, 3);
  return (
    <div className={styles.image__upload__group}>
      {fixedImages?.map((image, index) => (
        <div key={`${index}-${image}`}>
          <input
            id={`${index}-${image}`}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => onChangeFile(e, index)}
          />
          {image ? (
            // 이미지 있을 때 이미지 미리보기
            <label htmlFor={`${index}-${image}`} className={styles.image__label}>
              {/* <img src={`https://storage.googleapis.com/${image}`} className={styles.upload__image} /> */}
              <Image
                src={`https://storage.googleapis.com/${image}`}
                alt={`업로드이미지_${index}`}
                width={0}
                height={0}
                sizes="100vw"
                className={styles.upload__image}
              ></Image>
              <button className={styles.imageDeleteBtn} onClick={() => onClickDelete(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00001 8.70153L4.61801 12.0837C4.52567 12.1759 4.40962 12.2231 4.26984 12.2254C4.13017 12.2275 4.01201 12.1803 3.91534 12.0837C3.81879 11.987 3.77051 11.8699 3.77051 11.7324C3.77051 11.5948 3.81879 11.4777 3.91534 11.381L7.29751 7.99903L3.91534 4.61703C3.82312 4.5247 3.7759 4.40864 3.77367 4.26886C3.77156 4.1292 3.81879 4.01103 3.91534 3.91436C4.01201 3.81781 4.12912 3.76953 4.26667 3.76953C4.40423 3.76953 4.52134 3.81781 4.61801 3.91436L8.00001 7.29653L11.382 3.91436C11.4743 3.82214 11.5904 3.77492 11.7302 3.7727C11.8698 3.77059 11.988 3.81781 12.0847 3.91436C12.1812 4.01103 12.2295 4.12814 12.2295 4.2657C12.2295 4.40325 12.1812 4.52037 12.0847 4.61703L8.70251 7.99903L12.0847 11.381C12.1769 11.4734 12.2241 11.5894 12.2263 11.7292C12.2285 11.8689 12.1812 11.987 12.0847 12.0837C11.988 12.1803 11.8709 12.2285 11.7333 12.2285C11.5958 12.2285 11.4787 12.1803 11.382 12.0837L8.00001 8.70153Z"
                    fill="white"
                  />
                </svg>
              </button>
            </label>
          ) : (
            // 이미지 없을 때 미리보기
            <div className={classNames(styles.upload__image, styles.add__image)}>
              <label htmlFor={`${index}-${image}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M18.7513 21.2503H10.418C10.0638 21.2503 9.767 21.1305 9.52755 20.8907C9.28783 20.651 9.16797 20.3541 9.16797 19.9999C9.16797 19.6455 9.28783 19.3487 9.52755 19.1095C9.767 18.87 10.0638 18.7503 10.418 18.7503H18.7513V10.417C18.7513 10.0628 18.8712 9.76602 19.1109 9.52658C19.3506 9.28685 19.6476 9.16699 20.0017 9.16699C20.3562 9.16699 20.653 9.28685 20.8921 9.52658C21.1316 9.76602 21.2513 10.0628 21.2513 10.417V18.7503H29.5846C29.9388 18.7503 30.2356 18.8702 30.4751 19.1099C30.7148 19.3496 30.8346 19.6466 30.8346 20.0007C30.8346 20.3552 30.7148 20.652 30.4751 20.8912C30.2356 21.1306 29.9388 21.2503 29.5846 21.2503H21.2513V29.5837C21.2513 29.9378 21.1314 30.2346 20.8917 30.4741C20.652 30.7138 20.3551 30.8337 20.0009 30.8337C19.6464 30.8337 19.3496 30.7138 19.1105 30.4741C18.871 30.2346 18.7513 29.9378 18.7513 29.5837V21.2503Z"
                    fill="#777777"
                  />
                </svg>
                <span className={styles.textDesktop}>클릭해서 사진 업로드</span>
                <span className={styles.textMobile}>사진 업로드</span>
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
