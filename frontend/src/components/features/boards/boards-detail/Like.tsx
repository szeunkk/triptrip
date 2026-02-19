import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './Like.module.css'

export default function Like ({bad, good, likeBoard, dislikeBoard}:{bad: number|undefined; good: number|undefined, likeBoard: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>, dislikeBoard:(event: React.MouseEvent<HTMLDivElement>) => Promise<void>}){
    return(
        <div className={styles.boardsDetail__like__group}>
            <div className={styles.bad}  onClick={dislikeBoard}>
                <FrownOutlined style={{ fontSize: '24px', color: "#5F5F5F" }} />
                <span>{bad}</span>
            </div>
            <div className={styles.good} onClick={likeBoard}>
                <SmileOutlined style={{ fontSize: '24px', color: "#F66A6A" }} />
                <span>{good}</span>
            </div>
        </div>
    )
}