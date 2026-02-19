import styles from './DataList.module.css'

export default function DataList ({children, headerCell, flex, textAlign}:{children: React.ReactNode,headerCell: string[], flex: string[], textAlign: CanvasTextAlign[], BoardsCount?: number, currentPage?: number, changeCurrentPage?:(newNum: number) => void}) {

    const ListHeader = headerCell.map((el, index) => (
        <div 
        key={index} 
        style={{
            flex:`${flex[index]}`, 
            textAlign: textAlign[index] ?? 'center'
        }}
        >{el}</div>
    ))

    return(
        <div className={styles.DataListContainer}>
            {/* List Header */}
            <div className={styles.ListHeader}>
            {ListHeader}           
            </div>
                {children}
         </div>
    )
}