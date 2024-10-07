import { useEffect, useState } from "react";
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
