import { ThemeProvider } from "next-themes";


import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
