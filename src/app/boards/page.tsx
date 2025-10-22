import Boards from "@/components/boards";
import BoardsBest from "@/components/boards-best";
import styles from "./styles.module.css";

export default function BoardsPage() {
  return (
    <div className={styles.Boards}>
      <BoardsBest />
      <Boards />
    </div>
  );
}
