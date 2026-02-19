import styles from "./styles.module.css";
import useCommentList from "./hook";
import CommentListItem from "../comment-list-item";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CommentList() {
  const { fetchBoardComments, hasMore, onNext } = useCommentList?.();

  if (fetchBoardComments?.length === 0)
    return <div className={styles.NoComment}>등록된 댓글이 없습니다.</div>;

  return (
    <InfiniteScroll
      dataLength={fetchBoardComments?.length ?? 0}
      hasMore={hasMore}
      next={onNext}
      loader={<div className={styles.NoComment}> 로딩중입니다. </div>}
      className={styles.CommentList}
    >
      {/* 최신 댓글이 밑에 가게 순서 변경 ^*^ */}
      {fetchBoardComments.map((el) => (
        <CommentListItem key={el._id} el={el} />
      ))}
    </InfiniteScroll>
  );
}
