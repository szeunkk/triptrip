/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // 테스트 환경 변수를 명시적으로 전달
    NEXT_PUBLIC_TEST_ENV: process.env.NEXT_PUBLIC_TEST_ENV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
