export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/v3/auth/signout]");
  res.setHeader("Set-Cookie", [`refreshToken=;Max-Age=-1;path=/`]);
  res.status(200).json({ message: "Logged Out." });
}
