"use client";

import { supabase } from "@/commons/libraries/supabase";
import { useState } from "react";
import { TravelExpense } from ".";

export default function useTravelDetailExpense({ travel_id }: { travel_id: string }) {
  const [expenses, setExpenses] = useState<TravelExpense[]>([]);
  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from("travel_expense")
      .select("*")
      .eq("travel_id", travel_id)
      .is("delete_at", null) // 소프트 삭제 제외
      .order("date", { ascending: true })
      .order("created_at", { ascending: true });

    if (!error) {
      setExpenses(data ?? []);
    }
  };
  return { expenses, setExpenses, fetchExpenses };
}
