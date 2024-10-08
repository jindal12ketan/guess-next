import React, { useEffect } from "react";
import Link from "next/link";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { fetchAnalyticsWeights } from "@/utils/fetchAnalytics";
import { useSelector, useDispatch } from "react-redux";
import { routeStore } from "@/redux/slices/routeSlice";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const storedRoute = useSelector((state) => state.RouteSlice.storedRoute);
  console.log("Stored Routes:", storedRoute);

  useEffect(() => {
    const currentPath = router.pathname;

    const prefetchRoutes = async () => {
      const routesWeights = await fetchAnalyticsWeights(currentPath);

      if (routesWeights) {
        const sortedRoutes = Object.entries(routesWeights)
          .sort(([, weightA], [, weightB]) => weightB - weightA)
          .map(([route]) => route)
          .slice(0, 2);

        const newRoutes = sortedRoutes.filter(
          (route) => !storedRoute.includes(route)
        );

        if (newRoutes.length > 0) {
          const updatedRoutes = [...new Set([...storedRoute, ...newRoutes])];
          dispatch(routeStore({ storedRoute: updatedRoutes }));
          newRoutes.forEach((route) => {
            console.log(`new route prefetched: ${route}`);
            router.prefetch(route);
          });
        }
      } else {
        console.error(`No weights found for current path: ${currentPath}`);
      }
    };

    prefetchRoutes();
  }, [router.pathname, storedRoute, dispatch]);

  // const handleMouseEnter = (path) => {
  //   router.prefetch(path);
  // };

  const handleClick = (nextUrl) => {
    const currentUrl = router.pathname;
    gtag.logNavigationEvent(currentUrl, nextUrl);
  };

  return (
    <nav>
      <Link href="/" onClick={() => handleClick("/")}>
        Home
      </Link>
      {" | "}
      <Link href="/about" onClick={() => handleClick("/about")}>
        About
      </Link>
      {" | "}
      <Link href="/contact" onClick={() => handleClick("/contact")}>
        Contact
      </Link>
      {" | "}
      <Link href="/products" onClick={() => handleClick("/products")}>
        Products
      </Link>
      {" | "}
      <Link href="/blog" onClick={() => handleClick("/blog")}>
        Blog
      </Link>
      {" | "}
      <Link href="/services" onClick={() => handleClick("/services")}>
        Services
      </Link>
      {" | "}
      <Link href="/faq" onClick={() => handleClick("/faq")}>
        FAQ
      </Link>
    </nav>
  );
};

export default NavBar;
