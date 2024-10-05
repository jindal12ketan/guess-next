import Link from "next/link";
import fs from "fs";
import path from "path";
export default function Products() {
  return (
    <div>
      <h1>Our Products</h1>
      <Link href="/product/1">Product 1</Link>
    </div>
  );
}
export async function getServerSideProps() {
  const jsonFilePath = path.join(process.cwd(), "./routes.json");
  const routesData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  return {
    props: {
      routesData,
    },
  };
}
