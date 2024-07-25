import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import DataProvider from "@/context/DataContext";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
