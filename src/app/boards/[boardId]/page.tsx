import BoardsComment from "@/components/boards-comment";
import { BoardsDetail } from "@/components/boards-detail";
import styles from "./styles.module.css";

export default function BoardsDetailPage() {
  return (
    <div className={styles.BoardsDetail}>
      <BoardsDetail />
      <BoardsComment />
    </div>
  );
}
