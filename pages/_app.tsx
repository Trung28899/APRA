import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../store/store";
import Head from "next/head";
import Spinner from "@/modules/common/components/Spinner/Spinner";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/graphql";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Welcome to APRA | APRA</title>
      </Head>
      <Spinner />
      <ToastContainer />
      <ApolloProvider client={client}>
        <Component {...pageProps} />{" "}
      </ApolloProvider>
    </Provider>
  );
}
