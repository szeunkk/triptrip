import { useState } from "react";
import GetThumbnailUrl from "./getThumbnailUrl";
import GetVideoFromUrl from "./getVideoIdFromUrl";
import styles from "./YoutubeUrl.module.css";
import Image from "next/image";

export default function YoutubeUrl(props: { youtubeUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!props.youtubeUrl) {
    return null;
  }

  const videoId = GetVideoFromUrl(props.youtubeUrl);
  const ImageSrc = GetThumbnailUrl(videoId);
  const IframeSrc = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

  const onClickThumbnail = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.boardsDetail__youtube__group}>
      <Image
        src="/icons/play.svg"
        alt="유튜브 재생 버튼"
        width={0}
        height={0}
        sizes="100vw"
        className={`${styles.youtube__icon} ${isPlaying ? styles.hidden : ""}`}
        onClick={onClickThumbnail}
      ></Image>
      {ImageSrc && (
        <Image
          src={ImageSrc}
          alt="유튜브 썸네일 이미지"
          width={0}
          height={0}
          sizes="100vw"
          className={`${styles.youtube__thumbnail__image} ${isPlaying ? styles.hidden : ""}`}
          onClick={onClickThumbnail}
        ></Image>
      )}
      {isPlaying && (
        <iframe
          id="ytplayer"
          src={IframeSrc}
          allowFullScreen
          allow="autoplay; encrypted-media"
          className={`${styles.youtube__iframe}`}
        ></iframe>
      )}
    </div>
  );
}
