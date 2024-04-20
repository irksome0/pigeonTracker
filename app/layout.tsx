import "./globals.css";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout"
import Link from "antd/es/typography/Link";
import { Noto_Sans } from "next/font/google";
import { Metadata } from "next";
import { NavigationButton } from "./components/NavigationButton";

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const items =[
  {key: "home", label: <Link href={"/"}>Home</Link>},
  {key: "login", label: <Link href={"/login"}>Login</Link>},
  {key: "register", label: <Link href={"/register"}>Register</Link>},
]

export const metadata: Metadata = {
  title: "Pigeon Tracker",
  description:  "Pigeon Tracker",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.className}>
      <body>
        <Layout style={{ minHeight: "100vh"}} className="bg">
          <header>
            <a href={"/"} className="logo-text">Pigeon Tracker</a>
            <nav>
              <NavigationButton  text="Log in"/>
              <NavigationButton type="primary" text="Sign up"/>
            </nav>
          </header>
          <Content style={{padding: "0 48px", display:"flex", justifyContent: "center", alignItems:"center"}}>
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  );
}
