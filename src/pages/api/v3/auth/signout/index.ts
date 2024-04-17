import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("\n[api/v3/auth/signout]");
  res.setHeader("Set-Cookie", "refreshToken=;Max-Age=0;Path=/");
  res.status(200).json({ message: "Logged Out." });
}
