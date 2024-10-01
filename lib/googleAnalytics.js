const { google } = require("googleapis");
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("guess-next-analytics-258d8a01ca60.json", "utf8")
);
// Initialize the JWT client
const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key.replace(/\\n/g, "\n"), // Properly replace \n
  scopes: ["https://www.googleapis.com/auth/analytics"], // Scope for GA data API
});

const analyticsData = google.analyticsdata("v1beta");
/**
 * Fetch analytics data from GA4 using the Google Analytics Data API.
 * @returns {Promise<Object>} Analytics report
 */
async function getAnalyticsReport() {
  const propertyId = process.env.GA_PROPERTY_ID; // Ensure this env var is set in your .env

  if (!propertyId) {
    throw new Error("Missing GA_PROPERTY_ID environment variable");
  }

  const request = {
    dateRanges: [{ startDate: "2024-09-25", endDate: "2024-10-1" }], // Modify dates as needed
    metrics: [
      { name: "eventCount" }, // Metric for counting events
      { name: "totalUsers" }, // Metric for counting users
    ],
    dimensions: [
      { name: "pagePath" }, // For page URLs
      { name: "eventName" }, // For the names of the events
      //   { name: "eventParams:key" }, // For event parameters if you want specific event details
    ],
    orderBys: [
      { metric: { metricName: "eventCount" }, desc: true }, // Order by most frequent events
    ],
  };

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    auth: jwtClient,
    requestBody: request,
  });

  return response.data;
}

module.exports = {
  getAnalyticsReport,
};
