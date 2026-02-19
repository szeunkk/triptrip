import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloUploadSetting from "@/commons/settings/apollo-upload-setting";
import Layout from "@/commons/layout";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard-variable",
  display: "swap",
  weight: "45 920",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Re:fit",
  description: "Re:fit에 오신 걸 환영합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${geistMono.variable} antialiased`}>
        <ApolloUploadSetting>
          <Layout>{children}</Layout>
        </ApolloUploadSetting>
      </body>
    </html>
  );
}
