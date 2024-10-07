import React from "react";
import Link from "next/link";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
const NavBar = () => {
  const router = useRouter();
  const handleMouseEnter = (path) => {
    router.prefetch(path);
  };
  const handleClick = (nextUrl) => {
    const currentUrl = window.location.pathname;
    gtag.logNavigationEvent(currentUrl, nextUrl);
  };
  return (
    <nav>
      <Link
        href="/"
        onClick={() => handleClick("/")}
        onMouseEnter={() => handleMouseEnter("/")}
      >
        Home
      </Link>
      {" | "}
      <Link
        href="/about"
        onClick={() => handleClick("/about")}
        onMouseEnter={() => handleMouseEnter("/about")}
      >
        About
      </Link>
      {" | "}
      <Link
        href="/contact"
        onClick={() => handleClick("/contact")}
        onMouseEnter={() => handleMouseEnter("/contact")}
      >
        Contact
      </Link>
      {" | "}
      <Link
        href="/products"
        onClick={() => handleClick("/products")}
        onMouseEnter={() => handleMouseEnter("/products")}
      >
        Products
      </Link>
      {" | "}
      <Link
        href="/blog"
        onClick={() => handleClick("/blog")}
        onMouseEnter={() => handleMouseEnter("/blog")}
      >
        Blog
      </Link>
      {" | "}
      <Link
        href="/services"
        onClick={() => handleClick("/services")}
        onMouseEnter={() => handleMouseEnter("/services")}
      >
        Services
      </Link>
      {" | "}
      <Link
        href="/faq"
        onClick={() => handleClick("/faq")}
        onMouseEnter={() => handleMouseEnter("/faq")}
      >
        FAQ
      </Link>
    </nav>
  );
};

export default NavBar;
