import GoogleAnalytics from "@/components/GoogleAnalytics";
import NavBar from "@/components/NavBar";
import { Provider } from "react-redux";
import store from "@/redux/store";

const App = ({ Component, pageProps }) => {

  return (
    <>
      <GoogleAnalytics />
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
