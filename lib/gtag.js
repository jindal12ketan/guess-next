// export const GA_TRACKING_ID = "G-W8XKFRVMZX";

export const pageview = (url) => {
  window.gtag("config", process.env.GA_TRACKING_ID, {
    page_path: url,
  });
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Log specific events for navigation
export const logNavigationEvent = (currentUrl, nextUrl) => {
  window.gtag("event", "navigation", {
    event_category: "page_navigation",
    event_label: "url_transition",
    current_page: currentUrl, // Store current page URL
    next_page: nextUrl, // Store next page URL
  });
};
