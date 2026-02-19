import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import styles from "../styles.module.css";

interface GoogleMapComponentProps {
  lat: string;
  lng: string;
}

export default function GoogleMapComponent({ lat, lng }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lat || !lng || !mapRef.current) return;

    const initMap = async () => {
      // API 옵션 설정
      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "",
      });

      // Maps 라이브러리 로드
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { Map } = (await importLibrary("maps")) as any;

      // Marker 라이브러리 로드
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { Marker } = (await importLibrary("marker")) as any;

      const position = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      const map = new Map(mapRef.current!, {
        center: position,
        zoom: 15,
      });

      new Marker({
        position,
        map,
      });
    };

    initMap();
  }, [lat, lng]);

  return <div ref={mapRef} className={styles.map} />;
}




