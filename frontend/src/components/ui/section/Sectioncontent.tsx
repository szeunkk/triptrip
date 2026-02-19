import styels from './Sectioncontent.module.css'

export default function Sectioncontent ({content}: {content: string}){

    return(
        <div>
            <p className={styels.SectionContent}>{content}</p>
        </div>
    )
}