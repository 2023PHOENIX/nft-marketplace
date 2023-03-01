import { ThemeProvider } from "next-themes";
import Script from "next/script";

import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>

      {/* NOTE: fontawesome icons */}
      <Script src="https://kit.fontawesome.com/6ebc7a05ae.js" crossorigin="anonymous"></Script>
    </ThemeProvider>
  );
}
