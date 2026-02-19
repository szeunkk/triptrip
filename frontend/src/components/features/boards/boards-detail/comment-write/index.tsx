import { Button, Inputfield, Textareafield } from "@commons/ui";
import styles from "./styles.module.css";
import { StarTwoTone } from "@ant-design/icons";
import { IComment } from "../comment-list/types";
import { withAuth } from "@/commons/hocs/withAuth";
import useCommentForm from "./hook";

export default withAuth(function CommentWrite({
  isEdit,
  onClickEdit,
  el,
  isAuth,
  handleUnauthClick,
}: {
  isEdit: boolean;
  onClickEdit?: () => void;
  el?: IComment;
  isAuth?: boolean | undefined;
  handleUnauthClick?: (content?: string) => void;
}) {
  const { register, handleSubmit, formState, watch, setValue, onClickCommentSubmit, onClickCommentEdit } =
    useCommentForm({ el, onClickEdit });

  return (
    <form
      className={styles.CommentField}
      onSubmit={isEdit ? handleSubmit(onClickCommentEdit) : handleSubmit(onClickCommentSubmit)}
    >
      <div className={isEdit ? styles.CommentLabelEdit : styles.CommentLabel}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.0385 17.5L4.0365 19.5018C3.752 19.7864 3.42475 19.8509 3.05475 19.6952C2.68492 19.5394 2.5 19.2589 2.5 18.8538V4.30775C2.5 3.80258 2.675 3.375 3.025 3.025C3.375 2.675 3.80258 2.5 4.30775 2.5H19.6923C20.1974 2.5 20.625 2.675 20.975 3.025C21.325 3.375 21.5 3.80258 21.5 4.30775V15.6923C21.5 16.1974 21.325 16.625 20.975 16.975C20.625 17.325 20.1974 17.5 19.6923 17.5H6.0385ZM5.4 16H19.6923C19.7693 16 19.8398 15.9679 19.9038 15.9038C19.9679 15.8398 20 15.7692 20 15.6923V4.30775C20 4.23075 19.9679 4.16025 19.9038 4.09625C19.8398 4.03208 19.7693 4 19.6923 4H4.30775C4.23075 4 4.16025 4.03208 4.09625 4.09625C4.03208 4.16025 4 4.23075 4 4.30775V17.3848L5.4 16Z"
            fill="#333333"
          />
        </svg>
        <span>댓글</span>
      </div>
      <div className={styles.CommentRate}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index + 1}>
            <StarTwoTone
              style={{ fontSize: "1.25rem" }}
              twoToneColor={index + 1 <= watch("rating") ? "#FADA67" : "#C7C7C7"}
              onClick={() => {
                setValue("rating", index + 1);
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.CommentWrite}>
        <div className={styles.CommentWriterGroup}>
          <Inputfield
            type="text"
            label="작성자"
            required
            placeholder="작성자 명을 입력해 주세요."
            isEdit={isEdit}
            isAuth={isAuth}
            onClick={() => handleUnauthClick?.("댓글 등록은 로그인 후 가능합니다.")}
            error={formState.errors.writer?.message}
            {...register("writer")}
          ></Inputfield>
          <Inputfield
            type="password"
            label="비밀번호"
            required
            placeholder="비밀번호를 입력해 주세요."
            isAuth={isAuth}
            onClick={() => handleUnauthClick?.("댓글 등록은 로그인 후 가능합니다.")}
            error={formState.errors.password?.message}
            {...register("password")}
          ></Inputfield>
        </div>
        <div className={styles.CommentTextareaWrapper}>
          <Textareafield
            placeholder="댓글을 입력해 주세요."
            isCommentField
            maxLength={100}
            isAuth={isAuth}
            onClick={() => handleUnauthClick?.("댓글 등록은 로그인 후 가능합니다.")}
            error={formState.errors.contents?.message}
            {...register("contents")}
          />
          <div className={styles.CommentCount}>{watch("contents")?.length || 0}/100</div>
        </div>
        <div className={styles.CommentButtonGroup}>
          {isEdit && (
            <Button variant="CommentBtn" type="button" onClick={onClickEdit}>
              취소
            </Button>
          )}
          <Button variant="CommentBtn" type="submit" disabled={!formState.isValid}>
            {isEdit ? "수정 하기" : "댓글 등록"}
          </Button>
        </div>
      </div>
    </form>
  );
});
