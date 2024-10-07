import GoogleAnalytics from "@/components/GoogleAnalytics";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchAnalyticsWeights } from "@/utils/fetchAnalytics";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;

    const prefetchRoutes = async () => {
      const routesWeights = await fetchAnalyticsWeights(currentPath);

      if (routesWeights) {
        const sortedRoutes = Object.entries(routesWeights)
          .sort(([, weightA], [, weightB]) => weightB - weightA)
          .map(([route]) => route);

        if (sortedRoutes.length > 0) {
          sortedRoutes.slice(0, 2).forEach((route) => {
            router.prefetch(route);
          });
        }
      } else {
        console.error(`No weights found for current path: ${currentPath}`);
      }
    };

    prefetchRoutes();
  }, [router.pathname]);

  return (
    <>
      <GoogleAnalytics />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default App;
