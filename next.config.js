/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PRODUCTION_ENV: process.env.NEXT_PRODUCTION_ENV,

    // NEXTAUTH_URL:
    //   process.env.NODE_ENV === "production"
    //     ? process.env.NEXT_PRODUCTION_ENV + "/api/auth"
    //     : process.env.NEXT_PUBLIC_ENV + "/api/auth",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,

    MONGODB_URI: process.env.MONGODB_URI,

    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    CLOUDINARY_API_BASE_URL: process.env.CLOUDINARY_API_BASE_URL,
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
  //       source: "/:path*",
  //       // source: "/api/:path*",
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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://commerce-next-app-zeta.vercel.app/api/:path*",
  //     },
  //   ];
  // },
  // async rewrites() {
  //   const BASE_URL =
  //     process.env.NODE_ENV === "production"
  //       ? process.env.NEXT_PRODUCTION_ENV
  //       : process.env.NEXT_PUBLIC_ENV;
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${BASE_URL}/api/auth/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
