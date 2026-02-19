import styles from "./styles.module.css";
import { usePagination } from "./hook";
import { IPaginationProps } from "./types";

export default function Pagination(props: IPaginationProps) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);

  return (
    <div className={styles.pagination}>
      <div onClick={onClickPrevPage} className={styles.pageMoveBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
        >
          <path
            d="M2.80156 6.00005L6.70156 2.10005C6.8849 1.91672 6.97656 1.68338 6.97656 1.40005C6.97656 1.11672 6.8849 0.883382 6.70156 0.700049C6.51823 0.516715 6.2849 0.425049 6.00156 0.425049C5.71823 0.425049 5.4849 0.516715 5.30156 0.700049L0.701562 5.30005C0.601562 5.40005 0.530729 5.50838 0.489062 5.62505C0.447396 5.74172 0.426562 5.86672 0.426562 6.00005C0.426562 6.13338 0.447396 6.25838 0.489062 6.37505C0.530729 6.49172 0.601562 6.60005 0.701562 6.70005L5.30156 11.3C5.4849 11.4834 5.71823 11.575 6.00156 11.575C6.2849 11.575 6.51823 11.4834 6.70156 11.3C6.8849 11.1167 6.97656 10.8834 6.97656 10.6C6.97656 10.3167 6.8849 10.0834 6.70156 9.90005L2.80156 6.00005Z"
            fill={startPage === 1 ? "#C7C7C7" : "#333333"}
          />
        </svg>
      </div>
      <div className={styles.pages}>
        {new Array(5).fill("").map(
          (_, index) =>
            index + startPage <= props.lastPage && (
              <button
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
                className={
                  props.currentPage === startPage + index
                    ? styles.clickedPageBtn
                    : styles.pageBtn
                }
              >
                {index + startPage}
              </button>
            )
        )}
      </div>
      <div onClick={onClickNextPage} className={styles.pageMoveBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
        >
          <path
            d="M4.60078 6.00005L0.700781 2.10005C0.517448 1.91672 0.425781 1.68338 0.425781 1.40005C0.425781 1.11672 0.517448 0.883382 0.700781 0.700049C0.884115 0.516715 1.11745 0.425049 1.40078 0.425049C1.68411 0.425049 1.91745 0.516715 2.10078 0.700049L6.70078 5.30005C6.80078 5.40005 6.87161 5.50838 6.91328 5.62505C6.95495 5.74172 6.97578 5.86672 6.97578 6.00005C6.97578 6.13338 6.95495 6.25838 6.91328 6.37505C6.87161 6.49172 6.80078 6.60005 6.70078 6.70005L2.10078 11.3C1.91745 11.4834 1.68411 11.575 1.40078 11.575C1.11745 11.575 0.884115 11.4834 0.700781 11.3C0.517448 11.1167 0.425781 10.8834 0.425781 10.6C0.425781 10.3167 0.517448 10.0834 0.700781 9.90005L4.60078 6.00005Z"
            fill={props.lastPage < startPage + 5 ? "#C7C7C7" : "#333333"}
          />
        </svg>
      </div>
    </div>
  );
}
