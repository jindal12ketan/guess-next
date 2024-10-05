import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product {id}</h1>;
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
