"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { supabase } from "@/commons/libraries/supabase";
import styles from "./styles.module.css";
import {
  BsAirplaneFill,
  BsApple,
  BsBagHeartFill,
  BsBuildingsFill,
  BsBusFrontFill,
  BsCashCoin,
  BsCheckCircleFill,
  BsCupHotFill,
  BsFillBinocularsFill,
} from "react-icons/bs";

export interface TravelExpense {
  expense_id: string;
  travel_id: string;
  date: string;
  currency: string;
  amount: number;
  category: string;
  description: string;
  delete_at: string | null;
  created_at: string;
}

export default function TravelDetailExpenseList({ travel_id }: { travel_id: string }) {
  const [expenses, setExpenses] = useState<TravelExpense[]>([]);
  const fetchExpenses = useCallback(async () => {
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
  }, [travel_id]);
  useEffect(() => {
    if (travel_id) {
      fetchExpenses();
    }
  }, [travel_id, fetchExpenses]);

  type Iconkey = keyof typeof category;

  const category = {
    food: <BsApple />,
    coffee: <BsCupHotFill />,
    shopping: <BsBagHeartFill />,
    tourism: <BsFillBinocularsFill />,
    transportation: <BsBusFrontFill />,
    hotel: <BsBuildingsFill />,
    flight: <BsAirplaneFill />,
    etc: <BsCashCoin />,
    default: <BsCheckCircleFill />,
  };

  const onClickDelete = async (event: React.MouseEvent<SVGSVGElement>) => {
    const id = event.currentTarget.closest("div")?.id;

    const { error } = await supabase
      .from("travel_expense")
      .update({ delete_at: new Date().toISOString() })
      .eq("expense_id", id)
      .select();

    fetchExpenses();

    if (error) {
      console.log("삭제실패", error);
      return;
    }
  };

  return (
    <div className={styles.ExpenseList}>
      {expenses?.map((el) => {
        return (
          <Fragment key={el.expense_id}>
            <div className={styles.ListRow} id={el.expense_id}>
              <div>{el.date}</div>
              <div>
                {el.currency} {el.amount}
              </div>
              <div>
                {category[el.category as Iconkey]}
                {el.description}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16.8845"
                viewBox="0 0 16 18"
                fill="none"
                onClick={onClickDelete}
                className={styles.delete}
              >
                <path
                  d="M3.30775 17.5C2.81058 17.5 2.385 17.323 2.031 16.969C1.677 16.615 1.5 16.1894 1.5 15.6922V2.99998H1.25C1.0375 2.99998 0.859417 2.92806 0.71575 2.78423C0.571917 2.6404 0.5 2.46223 0.5 2.24973C0.5 2.03706 0.571917 1.85898 0.71575 1.71548C0.859417 1.57181 1.0375 1.49998 1.25 1.49998H5C5 1.25515 5.08625 1.04648 5.25875 0.873979C5.43108 0.701646 5.63967 0.615479 5.8845 0.615479H10.1155C10.3603 0.615479 10.5689 0.701646 10.7413 0.873979C10.9138 1.04648 11 1.25515 11 1.49998H14.75C14.9625 1.49998 15.1406 1.5719 15.2843 1.71573C15.4281 1.85956 15.5 2.03773 15.5 2.25023C15.5 2.4629 15.4281 2.64098 15.2843 2.78448C15.1406 2.92815 14.9625 2.99998 14.75 2.99998H14.5V15.6922C14.5 16.1894 14.323 16.615 13.969 16.969C13.615 17.323 13.1894 17.5 12.6923 17.5H3.30775ZM13 2.99998H3V15.6922C3 15.7821 3.02883 15.8558 3.0865 15.9135C3.14417 15.9711 3.21792 16 3.30775 16H12.6923C12.7821 16 12.8558 15.9711 12.9135 15.9135C12.9712 15.8558 13 15.7821 13 15.6922V2.99998ZM6.15425 14C6.36675 14 6.54483 13.9281 6.6885 13.7845C6.832 13.6406 6.90375 13.4625 6.90375 13.25V5.74998C6.90375 5.53748 6.83183 5.35931 6.688 5.21548C6.54433 5.07181 6.36617 4.99998 6.1535 4.99998C5.941 4.99998 5.76292 5.07181 5.61925 5.21548C5.47575 5.35931 5.404 5.53748 5.404 5.74998V13.25C5.404 13.4625 5.47583 13.6406 5.6195 13.7845C5.76333 13.9281 5.94158 14 6.15425 14ZM9.8465 14C10.059 14 10.2371 13.9281 10.3807 13.7845C10.5243 13.6406 10.596 13.4625 10.596 13.25V5.74998C10.596 5.53748 10.5242 5.35931 10.3805 5.21548C10.2367 5.07181 10.0584 4.99998 9.84575 4.99998C9.63325 4.99998 9.45517 5.07181 9.3115 5.21548C9.168 5.35931 9.09625 5.53748 9.09625 5.74998V13.25C9.09625 13.4625 9.16817 13.6406 9.312 13.7845C9.45567 13.9281 9.63383 14 9.8465 14Z"
                  fill="#ABABAB"
                />
              </svg>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
