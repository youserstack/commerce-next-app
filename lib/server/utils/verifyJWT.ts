import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  console.log("\x1b[32m[lib/server/verifyJWT]");

  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  if (!accessToken) {
    console.log("\x1b[31mNo accessToken");
    return false;
  }

  // verify the tokens
  try {
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return verified;
  } catch (error: any) {
    console.log({ error });
    return false;
  }
}
