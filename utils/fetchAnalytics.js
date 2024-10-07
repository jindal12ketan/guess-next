import axios from "axios";

export const fetchAnalyticsWeights = async (currentPath) => {
  try {
    const response = await axios.get("/api/analytics");
    return response.data[currentPath] || null;
  } catch (error) {
    console.error("Failed to fetch analytics report", error);
    return null;
  }
};
