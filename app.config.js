import 'dotenv/config';

export default {
  expo: {
    name: "GoodPeople",  // Replace with your actual app name
    slug: "goodpeople",  // Replace with your actual app slug
    // ... other existing configurations ...
    extra: {
      apiUrlDev: process.env.API_URL_DEV || "http://192.168.8.223:3000",
      apiUrlProd: process.env.API_URL_PROD || "https://your-production-api-url.com",
    },
  },
};
