import styles from './Sectiontitle.module.css'

export default function Sectiontitle ({text}: {text: string}){
    return(
          <div className={styles.SectionTitle}>{text}</div>
    )
}