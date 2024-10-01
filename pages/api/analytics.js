import { getAnalyticsReport } from "../../lib/googleAnalytics";

export default async function handler(req, res) {
  try {
    const data = await getAnalyticsReport();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
}
