import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    apiUrlDev: process.env.API_URL_DEV || "http://192.168.8.223:3000",
    apiUrlProd: process.env.API_URL_PROD || "https://your-production-api-url.com",
    appEnv: process.env.APP_ENV || "development",
    debug: process.env.DEBUG === 'true',
  },
  jsEngine: "hermes",
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    ...config.ios,
    supportsTablet: true
  },
  android: {
    ...config.android,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    ...config.web,
    favicon: "./assets/favicon.png"
  }
});
