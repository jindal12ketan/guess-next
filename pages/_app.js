import GoogleAnalytics from "@/components/GoogleAnalytics";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const currentPath = window.location.pathname;
    // Check if the current path exists in the weights object
    if (pageProps?.routesData[currentPath]) {
      const sortedRoutes = Object.entries(pageProps.routesData[currentPath])
        .sort(([, weightA], [, weightB]) => weightB - weightA)
        .map(([route]) => route);
      console.log(sortedRoutes);
      // Ensure there are routes to prefetch
      if (sortedRoutes.length > 0) {
        sortedRoutes.slice(0, 2).forEach((route) => {
          router.prefetch(route);
          console.log(`Prefetching route: ${route}`);
        });
      }
    } else {
      console.error(`No weights found for current path: ${currentPath}`);
    }
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
