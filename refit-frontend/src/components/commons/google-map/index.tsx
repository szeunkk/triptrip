"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "./styles.module.css";

interface GoogleMapComponentProps {
  lat: number;
  lng: number;
}

// Google Maps 타입 선언
declare global {
  interface Window {
    google?: {
      maps?: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
      };
    };
    initGoogleMapsCallback?: () => void;
  }
}

let googleMapsPromise: Promise<void> | null = null;

// Google Maps 스크립트 로드 함수
const loadGoogleMapsScript = (): Promise<void> => {
  // 이미 로드된 경우
  if (typeof window !== "undefined" && window.google?.maps) {
    console.log("Google Maps already loaded");
    return Promise.resolve();
  }

  // 이미 로딩 중인 경우
  if (googleMapsPromise) {
    console.log("Google Maps loading in progress");
    return googleMapsPromise;
  }

  console.log("Starting Google Maps load");

  googleMapsPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not defined"));
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    
    if (!apiKey) {
      const error = new Error("Google Maps API key is not defined. Please check NEXT_PUBLIC_GOOGLE_MAP_KEY in environment variables.");
      console.error(error);
      reject(error);
      return;
    }

    // 이미 스크립트가 있는지 확인
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    
    if (existingScript) {
      console.log("Script tag exists, waiting for load");
      // 스크립트가 이미 있으면 로드 완료를 기다림
      const checkInterval = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkInterval);
          console.log("Google Maps loaded successfully (existing script)");
          googleMapsPromise = null;
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.google?.maps) {
          googleMapsPromise = null;
          reject(new Error("Google Maps script load timeout"));
        }
      }, 10000);
      return;
    }

    // 새 스크립트 생성
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps script loaded successfully");
      googleMapsPromise = null;
      resolve();
    };

    script.onerror = (e) => {
      console.error("Failed to load Google Maps script", e);
      googleMapsPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
    console.log("Google Maps script tag added to head");
  });

  return googleMapsPromise;
};

export default function GoogleMapComponent({ lat, lng }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      console.log("Initializing map with coordinates:", { lat, lng });
      
      try {
        setIsLoading(true);
        setError(null);

        // Google Maps API 스크립트 동적 로드
        await loadGoogleMapsScript();

        if (!isMounted) {
          console.log("Component unmounted during load");
          return;
        }

        if (!window.google?.maps) {
          throw new Error("Google Maps API not available after load");
        }

        if (!mapRef.current) {
          throw new Error("Map container element is not available");
        }

        console.log("Creating map instance");

        const mapOptions = {
          center: { lat, lng },
          zoom: 15,
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        console.log("Creating marker");
        // 마커 생성
        new window.google.maps.Marker({
          position: { lat, lng },
          map,
        });

        console.log("Map initialized successfully");
        setIsLoading(false);
      } catch (err) {
        console.error("Google Maps initialization error:", err);

        if (!isMounted) return;

        const errorMessage = (err as Error)?.message ?? "지도를 불러올 수 없습니다.";
        setError(errorMessage);
        setIsLoading(false);

        // 에러 모달 표시
        Modal.error({
          title: "지도를 불러오는데 실패했습니다.",
          content: errorMessage,
        });
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.mapWrapper} style={{ display: error || isLoading ? "none" : "block" }} />
      {isLoading && (
        <div className={styles.loadingMessage}>지도를 불러오는 중입니다...</div>
      )}
      {error && (
        <div className={styles.errorMessage}>
          <p>지도를 불러올 수 없습니다.</p>
          <p style={{ fontSize: "12px", marginTop: "8px", color: "#999" }}>{error}</p>
        </div>
      )}
    </div>
  );
}
