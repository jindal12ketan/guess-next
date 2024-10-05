import fs from "fs";

export default {
  webpack: (config, { isServer }) => {
    if (isServer) return config;
    return config;
  },
};
