import fs from "fs";
import path from "path";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to the Next.js</h1>
    </>
  );
};

export async function getServerSideProps() {
  const jsonFilePath = path.join(process.cwd(), "./routes.json");
  const routesData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  return {
    props: {
      routesData,
    },
  };
}

export default HomePage;
