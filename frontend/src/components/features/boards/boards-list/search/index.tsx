import { Button } from "@commons/ui";
import useSearchBar from "./hook";
import styles from "./styles.module.css";
import { ISearchBar } from "./types";

export default function SearchBar({
  endDate,
  startDate,
  search,
  setEndDate,
  setStartDate,
  setSearch,
  refetch,
  setCurrentPage,
}: ISearchBar) {
  const { onChangeSearch, onChangeStartDate, onChangeEndDate, onClickSearch } = useSearchBar({
    endDate,
    startDate,
    search,
    setEndDate,
    setStartDate,
    setSearch,
    refetch,
    setCurrentPage,
  });
  return (
    <div className={styles.searchbarGroup}>
      {
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            className={styles.calendarIcon}
          >
            <path
              d="M2.30775 19.5C1.80258 19.5 1.375 19.325 1.025 18.975C0.675 18.625 0.5 18.1974 0.5 17.6923V4.30777C0.5 3.8026 0.675 3.37502 1.025 3.02502C1.375 2.67502 1.80258 2.50002 2.30775 2.50002H3.69225V1.15377C3.69225 0.934599 3.76567 0.751599 3.9125 0.604765C4.05933 0.458099 4.24233 0.384766 4.4615 0.384766C4.68083 0.384766 4.86383 0.458099 5.0105 0.604765C5.15733 0.751599 5.23075 0.934599 5.23075 1.15377V2.50002H12.8077V1.13477C12.8077 0.921932 12.8795 0.743682 13.023 0.600015C13.1667 0.456515 13.3449 0.384766 13.5577 0.384766C13.7706 0.384766 13.9488 0.456515 14.0922 0.600015C14.2359 0.743682 14.3077 0.921932 14.3077 1.13477V2.50002H15.6923C16.1974 2.50002 16.625 2.67502 16.975 3.02502C17.325 3.37502 17.5 3.8026 17.5 4.30777V17.6923C17.5 18.1974 17.325 18.625 16.975 18.975C16.625 19.325 16.1974 19.5 15.6923 19.5H2.30775ZM2.30775 18H15.6923C15.7692 18 15.8398 17.9679 15.9038 17.9038C15.9679 17.8398 16 17.7693 16 17.6923V8.30777H2V17.6923C2 17.7693 2.03208 17.8398 2.09625 17.9038C2.16025 17.9679 2.23075 18 2.30775 18ZM2 6.80777H16V4.30777C16 4.23077 15.9679 4.16026 15.9038 4.09626C15.8398 4.0321 15.7692 4.00002 15.6923 4.00002H2.30775C2.23075 4.00002 2.16025 4.0321 2.09625 4.09626C2.03208 4.16026 2 4.23077 2 4.30777V6.80777Z"
              fill="#777777"
            />
          </svg>
          <div className={styles.calendarGroup}>
            <input
              type="date"
              className={styles.calendar}
              data-placeholder="YYYY.MM.DD"
              required
              onChange={onChangeStartDate}
            />
            -
            <input
              type="date"
              className={styles.calendar}
              data-placeholder="YYYY.MM.DD"
              required
              onChange={onChangeEndDate}
            />
          </div>
        </div>
      }
      <div className={styles.searchbar}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
            fill="black"
          />
        </svg>
        <input type="text" placeholder="제목을 검색해 주세요." onChange={onChangeSearch} />
      </div>
      <Button type="submit" variant="CommentBtn" onClick={onClickSearch}>
        검색
      </Button>
    </div>
  );
}
