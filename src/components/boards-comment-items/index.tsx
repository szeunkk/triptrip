import styles from "./styles.module.css";

/**
 * BoardsCommentItems Component
 * 게시판 댓글 아이템 섹션의 와이어프레임 레이아웃을 제공하는 컴포넌트입니다.
 * Profile, Content, Date 영역으로 구성됩니다.
 */
export function BoardsCommentItems() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>Profile 영역</div>
      <div className={styles.content}>Content 영역</div>
      <div className={styles.date}>Date 영역</div>
    </div>
  );
}

export default BoardsCommentItems;
