import Head from "next/head";
import React, { ReactNode } from "react";
import { SwipeableHandlers } from "react-swipeable";
import Footer from "../components/Footer/Footer";
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
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta lang={lang} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container flex-1 py-4 lg:py-6" {...swipeable}>
        {children}
      </div>
      <Footer />
    </div>
  </React.Fragment>
);

export default Layout;
