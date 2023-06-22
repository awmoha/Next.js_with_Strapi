import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "Layout/Layout";
import RootLayout from "./layout";
import CheckoutPage from "components/CheckoutPage";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <RootLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RootLayout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
