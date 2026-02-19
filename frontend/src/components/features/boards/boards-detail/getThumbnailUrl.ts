export default function GetThumbnailUrl (videoId: string | null | undefined){
    if(!videoId) return null;

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}