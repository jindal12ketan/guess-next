const { google } = require("googleapis");
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
);
// Initialize the JWT client
const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/analytics"],
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

  const formattedDate = new Date().toISOString().slice(0, 10);
  const request = {
    dateRanges: [{ startDate: "2024-09-25", endDate: formattedDate }],
    metrics: [
      { name: "eventCount" }, 
    ],
    dimensions: [
      { name: "eventName" },
      { name: "customEvent:current_page" }, 
      { name: "customEvent:next_page" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          matchType: "EXACT",
          value: "navigation",
        },
      },
    },
    orderBys: [
      { metric: { metricName: "eventCount" }, desc: true }, // Order by most frequent events
    ],
  };

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    auth: jwtClient,
    requestBody: request,
  });

  const routesRows = response.data.rows;
  let transformedData = {};

  routesRows.forEach((row) => {
    const currentPage = row.dimensionValues[1].value;
    const nextPage = row.dimensionValues[2].value;
    const count = parseInt(row.metricValues[0].value);

    if (!transformedData[currentPage]) {
      transformedData[currentPage] = {};
    }

    transformedData[currentPage][nextPage] =
      (transformedData[currentPage][nextPage] || 0) + count;
  });

  return transformedData;
}

module.exports = {
  getAnalyticsReport,
};
