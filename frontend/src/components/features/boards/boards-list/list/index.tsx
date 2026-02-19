"use client";

import styles from "./styles.module.css";
import ListRow from "@/components/ui/list/ListRow";
import { BoardType, IBoardsListProps } from "./types";

export default function BoardsList(props: IBoardsListProps) {
  return (
    <div className={styles.ListRows}>
      {props.data && props.data.length > 0 ? (
        props.data?.map((el: BoardType, index: number) => (
          <ListRow
            key={el._id}
            num={props.pageNum[index]}
            flex={props.flex}
            textAlign={props.textAlign}
            _id={el._id}
            title={el.title}
            writer={el.writer as string}
            createdAt={el.createdAt}
            currentPage={props.currentPage}
            refetch={props.refetch}
            search={props.search}
          ></ListRow>
        ))
      ) : (
        <div className={styles.noSearchResult}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
