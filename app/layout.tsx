import "./globals.css";
import Layout, {Content} from "antd/es/layout/layout"
import { Noto_Sans } from "next/font/google";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/sessionProvider"
import Link from "next/link";
import Nav from "@/components/Nav";
import { useEffect } from "react";

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Pigeon Tracker",
  description:  "Pigeon Tracker",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={notoSans.className}>
      <body>
      <SessionProvider session={session}>
        <Layout style={{ minHeight: "100vh"}} className="bg">
          <header>
            <Link href={"/"} className="logo-text">Pigeon Tracker</Link>
            <Nav/>
          </header>
          <Content style={{padding: "0 48px", display:"flex", justifyContent: "center", alignItems:"center"}}>
            {children}
          </Content>
        </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
