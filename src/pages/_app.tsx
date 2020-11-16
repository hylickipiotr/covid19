import React from "react";
import { AppProps } from "next/app";

import "../styles/tailwind.css";
import "../styles/main.css";
import { SearchProvider } from "../components/Search/SearchContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
};

export default App;
