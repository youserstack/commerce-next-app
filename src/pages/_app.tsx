import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "lib/client/store/store";
import Layout from "@/components/layout/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider
        session={pageProps.session}
        baseUrl={
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PROD_ENV + "/api/auth"
            : process.env.NEXT_DEV_ENV + "/api/auth"
        }
        // basePath="/api/auth"
      >
        <PayPalScriptProvider
          options={{
            clientId:
              "AcULxbuM10RVy-N1_GM-dMDW35qOoqKjNNX99mVOKvKwzJ_Q74Agh4GlbclFt5VJhvqqt_ltBGWvpNti",
            currency: "USD",
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PayPalScriptProvider>
      </SessionProvider>
    </Provider>
  );
}
