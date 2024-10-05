import React from "react";
import Link from "next/link";
import * as gtag from "../lib/gtag";
const NavBar = () => {
  const handleClick = (nextUrl) => {
    const currentUrl = window.location.pathname;
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
      <Link href="/faq" onClick={() => handleClick("/faq")}>
        FAQ
      </Link>
    </nav>
  );
};

export default NavBar;
