"use client";

import { Button, Inputfield } from "@commons/ui";
import styles from "./style.module.css";
import useTravelWrite from "./hook";

interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTravels: () => Promise<void>;
}

export default function TravelWrite({ setVisible, fetchTravels }: Props) {
  const { inputs, onChangeInputs, onClickSubmit, isValid } = useTravelWrite({
    fetchTravels,
  });

  return (
    <div className={styles.TravelWriteForm}>
      <Inputfield
        type="text"
        placeholder="여행지를 선택해주세요"
        label="여행국가"
        id="destination"
        onChange={onChangeInputs}
        value={inputs?.destination}
      />
      <Inputfield
        type="text"
        placeholder="이번 여행에 대한 간단한 제목을 입력해주세요"
        label="여행 제목"
        id="title"
        onChange={onChangeInputs}
        value={inputs?.title}
      />
      <div className={styles.DateGroup}>
        <Inputfield
          type="date"
          placeholder="YYYY.MM.DD"
          label="시작일"
          id="startDate"
          onChange={onChangeInputs}
          value={inputs?.startDate}
        />
        <Inputfield
          type="date"
          placeholder="YYYY.MM.DD"
          label="종료일"
          id="endDate"
          onChange={onChangeInputs}
          value={inputs?.endDate}
        />
      </div>
      <div className={styles.ButtonGroup} onClick={() => setVisible(false)}>
        <Button variant="FormBtn" type="button">
          취소
        </Button>
        <Button variant="FormBtn" type="submit" disabled={isValid} onClick={onClickSubmit}>
          등록하기
        </Button>
      </div>
    </div>
  );
}
