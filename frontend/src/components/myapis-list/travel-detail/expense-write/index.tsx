"use client";

import { supabase } from "@/commons/libraries/supabase";
import { Button, Inputfield } from "@commons/ui";
import { useParams } from "next/navigation";
import { useState } from "react";

export type ExpenseType = "income" | "expenses" | "";

export default function TravelDetailExpenseWrite({
  setVisible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams();
  const travel_id = params.travel_id;

  const [type, setType] = useState<ExpenseType>("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const onClickSubmit = async () => {
    const result = await supabase.from("travel_expense").insert({
      type,
      category,
      amount,
      description,
      travel_id,
      date,
      currency: "JPY",
    });

    console.log(result);
    console.log(travel_id);

    setVisible(false);
    setType("");
    setCategory("");
    setAmount("");
    setDescription("");
    setDate("");
  };
  return (
    <form onSubmit={onClickSubmit}>
      {type === "" && (
        <>
          <Button variant="FormBtn" type="button" onClick={() => setType("income")}>
            수입
          </Button>
          <Button variant="FormBtn" type="button" onClick={() => setType("expenses")}>
            지출
          </Button>
        </>
      )}
      {type === "expenses" && (
        // 지출 선택 시 라디오 버튼
        <div>
          <input type="radio" name="category" id="food" onChange={(e) => setCategory(e.target.id)} />
          식비
          <input type="radio" name="category" id="coffee" onChange={(e) => setCategory(e.target.id)} />
          커피/음료
          <input type="radio" name="category" id="shopping" onChange={(e) => setCategory(e.target.id)} />
          쇼핑
          <input type="radio" name="category" id="tourism" onChange={(e) => setCategory(e.target.id)} />
          관광
          <input
            type="radio"
            name="category"
            id="transportation"
            onChange={(e) => setCategory(e.target.id)}
          />
          교통
          <input type="radio" name="category" id="hotel" onChange={(e) => setCategory(e.target.id)} />
          숙박
          <input type="radio" name="category" id="flight" onChange={(e) => setCategory(e.target.id)} />
          항공
          <input type="radio" name="category" id="etc" onChange={(e) => setCategory(e.target.id)} />
          기타
        </div>
      )}
      {type === "income" && <>예산을 입력해주세요.</>}
      {category && (
        <div>
          <Inputfield
            type="date"
            label="날짜"
            placeholder="YYYY.MM.DD"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <Inputfield
            type="number"
            placeholder="금액을 입력해주세요"
            label="금액"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <Inputfield
            type="text"
            placeholder="메모를 입력해주세요"
            label="메모"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Button variant="FormBtn" type="button" onClick={() => setVisible(false)}>
            취소
          </Button>
          <Button variant="FormBtn" type="submit">
            추가
          </Button>
        </div>
      )}
    </form>
  );
}
