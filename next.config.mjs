import { GuessPlugin } from "guess-webpack";
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("guess-next-analytics-258d8a01ca60.json", "utf8")
);

export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new GuessPlugin({
          GA: "460506834",
          jwt: {
            client_email: serviceAccount.client_email,
            private_key: serviceAccount.private_key.replace(/\\n/g, "\n"),
          },
          runtime: {
            delegate: true,
          },
        })
      );
    }
    return config;
  },
};
