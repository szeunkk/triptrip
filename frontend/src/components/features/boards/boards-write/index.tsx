"use client";

import { Button, Inputfield, Textareafield, InputBoardAddress } from "@commons/ui";
import styles from "./style.module.css";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Board } from "@/commons/graphql/graphql";
import UploadImages from "./uploadImages/uploadImages";
import useBoardForm from "./hook";
import { FieldErrors } from "react-hook-form";

export default function BoardsWrite({ isEdit, data }: { isEdit: boolean; data?: { fetchBoard: Board } }) {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    onClickSubmit,
    isModalOpen,
    onToggleModal,
    onClickDelete,
    onChangeFile,
    onClickCancel,
    handleComplete,
    onClickUpdate,
  } = useBoardForm({ data, isEdit });

  return (
    <form
      className={styles.Formfield}
      onSubmit={isEdit ? handleSubmit(onClickUpdate) : handleSubmit(onClickSubmit)}
    >
      {/* 폼 타이틀 */}
      <div className={styles.postForm__title}>게시물 {isEdit ? "수정" : "등록"}</div>
      {/* 작성자 그룹 */}
      <div className={styles.postForm__writer__group}>
        <Inputfield
          type="text"
          label="작성자"
          required
          placeholder="작성자 명을 입력해 주세요."
          {...register("writer")}
          isEdit={isEdit}
          error={formState.errors.writer?.message}
        ></Inputfield>
        <Inputfield
          type="password"
          label="비밀번호"
          required
          placeholder="비밀번호를 입력해 주세요."
          {...register("password")}
          isEdit={isEdit}
          error={(formState.errors as FieldErrors<{ password?: string }>).password?.message}
        ></Inputfield>
      </div>
      <hr />
      <Inputfield
        type="text"
        label="제목"
        required
        placeholder="제목을 입력해 주세요."
        {...register("title")}
        error={formState.errors.title?.message}
      ></Inputfield>
      <hr />
      <Textareafield
        label="내용"
        required
        placeholder="내용을 입력해 주세요."
        {...register("contents")}
        error={formState.errors.contents?.message}
      ></Textareafield>
      <hr />
      <InputBoardAddress
        placeholder="주소를 입력해 주세요."
        placeholder_2="상세주소"
        isEdit={isEdit}
        register={register}
        onClick={onToggleModal}
        basePath="boardAddress"
      ></InputBoardAddress>
      {isModalOpen && (
        <Modal
          title="주소입력하기"
          open={true}
          styles={{ body: { height: 450 } }}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: "100%" }} />
        </Modal>
      )}
      <hr />
      <Inputfield
        type="string"
        label="유튜브 링크"
        placeholder="링크를 입력해 주세요."
        id="youtubeUrl"
        {...register("youtubeUrl")}
      ></Inputfield>
      <hr />
      <div className={styles.postForm__attachments__group}>
        <label>사진 첨부</label>
        <UploadImages
          images={watch("images") ?? []}
          onClickDelete={onClickDelete}
          onChangeFile={onChangeFile}
        />
      </div>
      <div className={styles.postForm__button__group}>
        <Button type="button" variant="FormBtn" onClick={onClickCancel}>
          취소
        </Button>
        <Button type="submit" variant="FormBtn" disabled={isEdit ? false : !formState.isValid}>
          {isEdit ? "수정" : "등록"}하기
        </Button>
      </div>
    </form>
  );
}
