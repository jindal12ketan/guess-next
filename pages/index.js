import Link from "next/link";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { guess } from "guess-webpack/api";
import { useEffect } from "react";

const useGuessPrefetch = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const predictions = Object.keys(guess).sort(
        (a, b) => a.length - b.length
      );
      predictions.forEach((route) => {
        router.prefetch(route);
      });
    }
  }, [router]);
};

const HomePage = () => {
  const handleClick = (label) => {
    gtag.event({
      action: "click",
      category: "navigation",
      label,
      value: "1",
    });
  };

  useGuessPrefetch();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <Link href="/about" onClick={() => handleClick("about_link")}>
          About
        </Link>
        <Link href="/contact" onClick={() => handleClick("contact_link")}>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
