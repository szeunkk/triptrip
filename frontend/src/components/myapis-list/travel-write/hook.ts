"use client";

import { supabase } from "@/commons/libraries/supabase";
import { useState } from "react";

export default function useTravelWrite({
  fetchTravels,
}: {
  fetchTravels: () => Promise<void>;
}) {
  // input state 관리 및 유효성 검사
  const [inputs, setInputs] = useState({
    destination: "",
    title: "",
    startDate: "",
    endDate: "",
  });
  const [isValid, setIsValid] = useState(true);

  // 유효성 검사
  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });

    if (
      inputs.destination &&
      inputs.title &&
      inputs.startDate &&
      inputs.endDate
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  // 여행 리스트 supabase로 전송
  const onClickSubmit = async () => {
    const result = await supabase.from("travel_list").insert({
      destination: inputs.destination,
      title: inputs.title,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
    });

    console.log(result);
    setInputs({
      ...inputs,
      destination: "",
      title: "",
      startDate: "",
      endDate: "",
    });
    setIsValid(false);
    fetchTravels();
  };

  return { inputs, onChangeInputs, onClickSubmit, isValid };
}
