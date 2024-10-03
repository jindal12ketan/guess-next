import { GuessPlugin } from "guess-webpack";
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
);

export default {
  webpack: (config, { isServer }) => {
    if (isServer) return config;
    config.plugins.push(
      new GuessPlugin({
        debug: true,
        GA: process.env.GA_PROPERTY_ID,
        jwt: {
          client_email: serviceAccount.client_email,
          private_key: serviceAccount.private_key.replace(/\\n/g, "\n"),
        },
        runtime: {
          delegate: true,
        },
      })
    );
    return config;
  },
};
