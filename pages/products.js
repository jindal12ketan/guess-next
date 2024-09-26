import Link from "next/link";

export default function Products() {
  return (
    <div>
      <h1>Our Products</h1>
      <Link href="/product/1">Product 1</Link>
    </div>
  );
}
