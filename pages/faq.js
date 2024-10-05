import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    }

    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return <p>Loading analytics data...</p>;
  }

  return (
    <div>
      <h1>Google Analytics Data</h1>
      <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
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
