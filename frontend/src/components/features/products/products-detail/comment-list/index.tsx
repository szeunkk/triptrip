"use client";

import styles from "./styles.module.css";

interface Comment {
  id: string;
  userName: string;
  profileImage: string;
  content: string;
  date: string;
  hasEditDelete: boolean;
}

interface Reply {
  id: string;
  questionId: string;
  userName: string;
  profileImage: string;
  content: string;
  date: string;
  hasEditDelete: boolean;
}

// Mock 데이터 - 문의사항 배열
const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    userName: "홍길동",
    profileImage: "/images/profile/1.svg",
    content:
      "살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라",
    date: "2024.11.11",
    hasEditDelete: true,
  },
  {
    id: "2",
    userName: "마에스트로",
    profileImage: "/images/profile/2.svg",
    content:
      "살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라",
    date: "2024.11.11",
    hasEditDelete: true,
  },
  {
    id: "3",
    userName: "자유로운 실버",
    profileImage: "/images/profile/3.svg",
    content:
      "살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라",
    date: "2024.11.11",
    hasEditDelete: true,
  },
];

// Mock 데이터 - 답변 배열
const MOCK_REPLIES: Reply[] = [
  {
    id: "3-1",
    questionId: "3",
    userName: "판매자",
    profileImage: "/images/profile/4.svg",
    content:
      "살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라",
    date: "2024.11.11",
    hasEditDelete: true,
  },
  {
    id: "3-2",
    questionId: "3",
    userName: "판매자",
    profileImage: "/images/profile/5.svg",
    content:
      "살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라",
    date: "2024.11.11",
    hasEditDelete: true,
  },
];

const ReplyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.11856 17.1153C6.8679 17.1153 6.65773 17.0305 6.48806 16.861C6.31856 16.6915 6.23381 16.4814 6.23381 16.2308V14.7308H18.6088L18.9261 15.048V6H20.4261C20.6767 6 20.8868 6.08475 21.0563 6.25425C21.226 6.42392 21.3108 6.634 21.3108 6.8845V18.4693C21.3108 18.8723 21.1258 19.1522 20.7558 19.309C20.386 19.4658 20.0587 19.4019 19.7741 19.1173L17.7723 17.1153H7.11856ZM6.23381 12.7308L4.23206 14.7328C3.9474 15.0173 3.62015 15.0812 3.25031 14.9245C2.88031 14.7677 2.69531 14.4877 2.69531 14.0845V3.38475C2.69531 3.13408 2.78015 2.92392 2.94981 2.75425C3.11931 2.58475 3.3294 2.5 3.58006 2.5H16.0416C16.2922 2.5 16.5023 2.58475 16.6718 2.75425C16.8413 2.92392 16.9261 3.13408 16.9261 3.38475V11.8463C16.9261 12.0968 16.8413 12.3068 16.6718 12.4765C16.5023 12.646 16.2922 12.7308 16.0416 12.7308H6.23381ZM15.4261 11.2308V4H4.19531V11.9233L4.88781 11.2308H15.4261Z"
      fill="var(--color-gray-800)"
    />
  </svg>
);

const ReturnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.473 19.9578C13.318 19.8026 13.2421 19.6253 13.2453 19.426C13.2484 19.2267 13.3243 19.0526 13.473 18.9038L16.627 15.75H7.30775C6.80908 15.75 6.38308 15.5734 6.02975 15.2203C5.67658 14.8669 5.5 14.4409 5.5 13.9423V5.25C5.5 5.03717 5.57183 4.859 5.7155 4.7155C5.859 4.57183 6.03717 4.5 6.25 4.5C6.46283 4.5 6.641 4.57183 6.7845 4.7155C6.92817 4.859 7 5.03717 7 5.25V13.9423C7 14.0321 7.02883 14.1058 7.0865 14.1635C7.14417 14.2212 7.21792 14.25 7.30775 14.25H16.627L13.4577 11.0807C13.3026 10.9256 13.2276 10.7499 13.2327 10.5538C13.2379 10.3578 13.3129 10.1822 13.4577 10.027C13.6129 9.87183 13.7902 9.79333 13.9895 9.7915C14.1888 9.7895 14.3628 9.86283 14.5115 10.0115L18.8673 14.3673C18.9609 14.4609 19.0269 14.5597 19.0652 14.6635C19.1038 14.7673 19.123 14.8795 19.123 15C19.123 15.1205 19.1038 15.2327 19.0652 15.3365C19.0269 15.4403 18.9609 15.5391 18.8673 15.6328L14.5423 19.9578C14.3871 20.1128 14.2089 20.1902 14.0078 20.1902C13.8064 20.1902 13.6282 20.1128 13.473 19.9578Z"
      fill="var(--color-gray-800)"
    />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.16406 15.8332H5.21531L13.7457 7.30275L12.6945 6.2515L4.16406 14.7819V15.8332ZM3.6674 17.0832C3.45392 17.0832 3.27503 17.0109 3.13073 16.8665C2.98628 16.7222 2.91406 16.5433 2.91406 16.3298V14.8861C2.91406 14.6829 2.95309 14.4892 3.03115 14.305C3.10906 14.1209 3.21642 13.9604 3.35323 13.8236L13.9061 3.27546C14.0321 3.16102 14.1712 3.07262 14.3234 3.01025C14.4758 2.94775 14.6355 2.9165 14.8026 2.9165C14.9697 2.9165 15.1315 2.94616 15.288 3.00546C15.4447 3.06477 15.5834 3.15907 15.7041 3.28838L16.7218 4.3188C16.8511 4.43949 16.9432 4.57838 16.9982 4.73546C17.0532 4.89255 17.0807 5.04963 17.0807 5.20671C17.0807 5.37435 17.0521 5.53428 16.9949 5.6865C16.9377 5.83887 16.8466 5.97803 16.7218 6.104L6.17365 16.644C6.03684 16.7808 5.87635 16.8882 5.69219 16.9661C5.50802 17.0441 5.31434 17.0832 5.11115 17.0832H3.6674ZM13.2109 6.7863L12.6945 6.2515L13.7457 7.30275L13.2109 6.7863Z"
      fill="var(--color-gray-800)"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.99781 10.8779L5.77031 15.1056C5.6549 15.2209 5.50983 15.2799 5.3351 15.2827C5.16052 15.2853 5.01281 15.2263 4.89198 15.1056C4.77128 14.9848 4.71094 14.8384 4.71094 14.6664C4.71094 14.4945 4.77128 14.3481 4.89198 14.2273L9.11969 9.99977L4.89198 5.77227C4.7767 5.65685 4.71767 5.51178 4.7149 5.33706C4.71226 5.16247 4.77128 5.01477 4.89198 4.89393C5.01281 4.77324 5.1592 4.71289 5.33115 4.71289C5.50309 4.71289 5.64948 4.77324 5.77031 4.89393L9.99781 9.12164L14.2253 4.89393C14.3407 4.77865 14.4858 4.71963 14.6605 4.71685C14.8351 4.71421 14.9828 4.77324 15.1036 4.89393C15.2243 5.01477 15.2847 5.16115 15.2847 5.3331C15.2847 5.50504 15.2243 5.65143 15.1036 5.77227L10.8759 9.99977L15.1036 14.2273C15.2189 14.3427 15.278 14.4878 15.2807 14.6625C15.2834 14.8371 15.2243 14.9848 15.1036 15.1056C14.9828 15.2263 14.8364 15.2866 14.6645 15.2866C14.4925 15.2866 14.3461 15.2263 14.2253 15.1056L9.99781 10.8779Z"
      fill="var(--color-gray-800)"
    />
  </svg>
);

interface CommentItemProps {
  userName: string;
  profileImage: string;
  content: string;
  date: string;
  hasEditDelete: boolean;
  isReply?: boolean;
}

const CommentItem = ({
  userName,
  profileImage,
  content,
  date,
  hasEditDelete,
  isReply = false,
}: CommentItemProps) => {
  return (
    <div className={isReply ? styles.replyWrapper : undefined}>
      {isReply && (
        <div className={styles.returnIcon}>
          <ReturnIcon />
        </div>
      )}
      <div className={styles.commentItem}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <img src={profileImage} alt={userName} className={styles.profileImage} />
            <span className={styles.userName}>{userName}</span>
          </div>
          {hasEditDelete && (
            <div className={styles.actions}>
              <button className={styles.iconButton} data-testid="edit-button">
                <EditIcon />
              </button>
              <button className={styles.iconButton} data-testid="delete-button">
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.replyButton}>
          <ReplyIcon />
          <span className={styles.replyText}>답변 하기</span>
        </div>
      </div>
    </div>
  );
};

export default function ProductsDetailCommentList() {
  const comments = MOCK_COMMENTS;
  const replies = MOCK_REPLIES;

  if (comments.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>등록된 문의사항이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="comment-list">
      {comments.map((comment, index) => {
        const commentReplies = replies.filter((reply) => reply.questionId === comment.id);

        return (
          <div key={comment.id}>
            {index > 0 && <div className={styles.divider} />}
            <CommentItem
              userName={comment.userName}
              profileImage={comment.profileImage}
              content={comment.content}
              date={comment.date}
              hasEditDelete={comment.hasEditDelete}
            />
            {commentReplies.map((reply) => (
              <CommentItem
                key={reply.id}
                userName={reply.userName}
                profileImage={reply.profileImage}
                content={reply.content}
                date={reply.date}
                hasEditDelete={reply.hasEditDelete}
                isReply={true}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
