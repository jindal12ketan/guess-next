const { google } = require("googleapis");
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
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
  const propertyId = process.env.GA_PROPERTY_ID;

  if (!propertyId) {
    throw new Error("Missing GA_PROPERTY_ID environment variable");
  }

  // const request = {
  //   dateRanges: [{ startDate: "2024-09-25", endDate: "2024-10-1" }], // Modify dates as needed
  //   metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
  //   dimensions: [{ name: "pagePath" }, { name: "eventName" }],
  //   orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  // };
  const formattedDate = new Date().toISOString().slice(0, 10);
  const request = {
    dateRanges: [{ startDate: "2024-09-25", endDate: formattedDate }], // Ensure date format is YYYY-MM-DD
    metrics: [
      { name: "eventCount" }, // Metric for counting events
    ],
    dimensions: [
      { name: "eventName" }, // For the names of the events
      { name: "customEvent:current_page" }, // Custom dimension for current page
      { name: "customEvent:next_page" }, // Custom dimension for next page
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
