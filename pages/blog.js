import fs from "fs";
import path from "path";
export default function Blog() {
  return <h1>Blog Page</h1>;
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
