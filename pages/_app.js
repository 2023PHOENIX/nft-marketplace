import { ThemeProvider } from "next-themes";
import Script from "next/script";

import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import "../styles/globals.css";


import {NFTContextProvider} from "../context/NFTContext.js";


export default function App({ Component, pageProps }) {
  return (
    <NFTContextProvider>

    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      {/* NOTE: fontawesome icons */}
      <Script
        src="https://kit.fontawesome.com/6ebc7a05ae.js"
        crossorigin="anonymous"
      ></Script>
    </ThemeProvider>
    </NFTContextProvider>
  );
}
