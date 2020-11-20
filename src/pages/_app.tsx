import React from "react";
import { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "../styles/tailwind.css";
import "../styles/main.css";
import { SearchProvider } from "../components/Search/SearchContext";
import { CacheProvider } from "../contexts/Cache";
import Head from "next/head";

library.add(fas);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Śledź statystyki COVID-19 z wszystkich krajów świata."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e53e3e" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <CacheProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </CacheProvider>
    </>
  );
};

export default App;
