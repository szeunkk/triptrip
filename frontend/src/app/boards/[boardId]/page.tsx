"use client"

import CommentWrite from "@/components/features/boards/boards-detail/comment-write";
import BoardsBoardDetailPage from "@/components/features/boards/boards-detail/detail";
import styles from './styles.module.css'
import CommentList from "@/components/features/boards/boards-detail/comment-list";

export default function BoardsBoardIdPage() {


    return(
        <div className={styles.boardsDetail}>
            <BoardsBoardDetailPage />
            <CommentWrite isEdit={false} />
            <CommentList />
        </div>

    )
}