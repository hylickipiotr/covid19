import Head from "next/head";
import React, { ReactNode } from "react";
import { SwipeableHandlers } from "react-swipeable";
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  lang?: string;
  title: string;
  swipeable?: SwipeableHandlers;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  lang,
  swipeable,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta lang={lang} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <div className="container py-4 lg:py-6" {...swipeable}>
      {children}
    </div>
  </div>
);

export default Layout;
