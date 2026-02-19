"use client";

import TravelList from "@/components/myapis-list/travel-list";
import useTravelList from "@/components/myapis-list/travel-list/hook";
import TravelWrite from "@/components/myapis-list/travel-write";
import { Button } from "@commons/ui";
import { useEffect, useState } from "react";

export default function MyapisPage() {
  const [visible, setVisible] = useState(false);
  const { travels, fetchTravels, onClickTravel } = useTravelList();

  useEffect(() => {
    fetchTravels();
  }, [fetchTravels]);

  return (
    <>
      <Button variant="FormBtn" type="button" onClick={() => setVisible(true)}>
        여행등록하기
      </Button>
      {visible && <TravelWrite setVisible={setVisible} fetchTravels={fetchTravels}></TravelWrite>}
      <TravelList travels={travels} onClickTravel={onClickTravel}></TravelList>
    </>
  );
}
