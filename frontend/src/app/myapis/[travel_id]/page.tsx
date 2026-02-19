"use client";

import TravelDetailExpenseList from "@/components/myapis-list/travel-detail/expense-list";
import TravelDetailExpenseWrite from "@/components/myapis-list/travel-detail/expense-write";
import { Button } from "@commons/ui";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TravelIdPage() {
  const params = useParams();
  const travel_id = String(params.travel_id);

  const [visible, setVisible] = useState(false);

  return (
    <div>
      여행 상세 페이지 입니다용
      <Button variant="FormBtn" type="button" onClick={() => setVisible(true)}>
        가계부 작성하기
      </Button>
      {visible && <TravelDetailExpenseWrite setVisible={setVisible}></TravelDetailExpenseWrite>}
      <TravelDetailExpenseList travel_id={travel_id}></TravelDetailExpenseList>
    </div>
  );
}
