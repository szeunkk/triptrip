import { supabase } from "@/commons/libraries/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface ITravels {
  travel_id: string;
  destination: string;
  title: string;
  startDate: string;
  endDate: string;
}

export default function useTravelList() {
  const router = useRouter();
  const [travels, setTravels] = useState<ITravels[]>([]);

  const fetchTravels = async () => {
    const { data, error } = await supabase.from("travel_list").select("*");
    if (error) return;
    setTravels(data ?? []);
  };

  const onClickTravel = (event: React.MouseEvent<HTMLDivElement>) => {
    const travel_id = event.currentTarget.id;
    router.push(`/myapis/${travel_id}`);
  };

  return { travels, fetchTravels, onClickTravel };
}
