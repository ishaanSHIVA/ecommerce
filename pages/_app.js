import React from "react";
import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/state.context";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster></Toaster>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
