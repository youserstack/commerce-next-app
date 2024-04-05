/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    // BASE_URL: "https://commerce-next-app-zeta.vercel.app/",
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,

    // mongodb
    MONGODB_URI: process.env.MONGODB_URI,

    // cloudinary
    CLOUD_NAME: "dzktdrw7o",
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUDINARY_PRESET: "next_commerce_app_upload_preset",
    CLOUDINARY_API_BASE_URL: "https://api.cloudinary.com/v1_1/dzktdrw7o/upload",

    // auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "www.usashop.co.kr",
      "source.unsplash.com",
      "shop-phinf.pstatic.net",
      "shopping-phinf.pstatic.net",
      "www.thecookierookie.com",
      "imagesvc.meredithcorp.io",
      "k.kakaocdn.net",
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       // source: "/:path*",
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // compiler: {
  //   styledComponents: true,
  // },
};

module.exports = nextConfig;
