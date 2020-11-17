import React from "react";
import { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "../styles/tailwind.css";
import "../styles/main.css";
import { SearchProvider } from "../components/Search/SearchContext";

library.add(fas);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
};

export default App;
