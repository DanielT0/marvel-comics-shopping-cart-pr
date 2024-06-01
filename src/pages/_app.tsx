import { Loader } from "@/components/loader/loader";
import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { ContextProvider } from "@/utils/context";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <ContextProvider>
        <div className="h-full">
          <div className="absolute h-full">
            <Navbar />
            <Component {...pageProps} />
          </div>
          {loading && (
            <div className="fixed z-20 w-full h-full backdrop-blur-lg opacity-90 bg-black text-lg text-white">
              <div className="w-full h-full flex items-center justify-center flex-col">
                <Loader />
              </div>
            </div>
          )}
        </div>
      </ContextProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
