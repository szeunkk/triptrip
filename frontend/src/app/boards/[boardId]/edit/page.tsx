"use client"

import BoardsWrite from "@/components/features/boards/boards-write";
import { FETCH_BOARD } from "@/graphql/queries/board";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function BoardsEditPage (){
    const params = useParams();
    const boardId = params.boardId
    const { data } = useQuery(FETCH_BOARD, {
      variables: {
          boardId: boardId
      }
  })


    return(
      <BoardsWrite isEdit={true} data={data}/>
    );
}