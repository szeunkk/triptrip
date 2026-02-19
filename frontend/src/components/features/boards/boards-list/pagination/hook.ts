import { useState } from "react"
import { IPaginationProps } from "./types"

export const usePagination = (props: IPaginationProps) => {
    
    const [startPage, setStartPage] = useState(1)

    const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {

        props.refetch({page: Number(event.currentTarget.id)})
        props.setCurrentPage(Number(event.currentTarget.id))
    }

    const onClickPrevPage = () => {
        if(startPage===1) return;
        setStartPage(startPage - props.numPerPageGroup)
        props.refetch({page: startPage - props.numPerPageGroup + (props.numPerPageGroup - 1)})
        props.setCurrentPage(startPage - props.numPerPageGroup + ( props.numPerPageGroup - 1))
    }

    const onClickNextPage = () => {
        if (startPage + 5 <= props.lastPage){
        setStartPage(startPage + props.numPerPageGroup)
        props.refetch({page: startPage + props.numPerPageGroup})
        props.setCurrentPage(startPage + props.numPerPageGroup)
        } else {
            alert("안돼 돌아가")
        }
    }
    
    return {startPage, onClickPage, onClickPrevPage, onClickNextPage}
}