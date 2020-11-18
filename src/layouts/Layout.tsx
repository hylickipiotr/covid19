import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps {
  children?: ReactNode;
  lang?: string;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, lang }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta lang={lang} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <div className="container py-4 lg:py-6">{children}</div>
  </div>
);

export default Layout;
