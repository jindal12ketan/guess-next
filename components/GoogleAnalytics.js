import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

const GoogleAnalytics = () => {
  const router = useRouter();
  const handleRouteChange = (url) => {
    gtag.pageview(url);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default GoogleAnalytics;
