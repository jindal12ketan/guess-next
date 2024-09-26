import "@/styles/globals.css";

import GoogleAnalytics from "../components/GoogleAnalytics";

function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default App;
