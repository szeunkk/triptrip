export default function GetVideoFromUrl(url: string){

    if(!url || url.length === 0 || !url.includes("youtu") ){
        return null
    }

    let videoId ;

    const path = new URL(url).pathname
    
    switch(true){
        case url.includes("watch?v="): {
            const urlParams = new URLSearchParams(new URL(url).search)
            videoId = urlParams.get('v');
            break;
        }
        case url.includes("embed/"): {
            const pathSegments = path.split("/");
            videoId = pathSegments[pathSegments.length - 1];
            break;
        }
        case url.includes("be/"): {
            videoId = path.substring(1);
            break;
        }
        case url.includes("shorts/"): {
            const pathSegments = path.split("/");
            videoId = pathSegments[pathSegments.length - 1];
            break;
        }
        default: {
            videoId = null;
        }
    }

    return videoId && videoId.length === 11 ? videoId : null;
}