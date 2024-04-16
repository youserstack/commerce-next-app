import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const checkAuth = async (req: any, res: any, next: any) => {
  // console.log("\n<middleware/checkAuth>");

  // 세션확인
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    req.user = session.user;
    return await next();
  }

  // 토큰확인
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  console.log({ authorization });

  // verify
  const verified: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!verified) return res.status(401).json({ message: "Unauthorized" });
  // console.log({ verified });

  // inject the role
  req.user = { role: verified.role, id: verified._id };
  return await next();

  // get the credentials from session and cookies
  // const cookies = cookie.parse(req.headers.cookie)
  // const session: any = await getSession({ req });
  // const token = await getToken({ req });
  // const { refreshToken } = req.cookies;
  // if (!session) throw new Error("No session");
  // if (session.user?.role !== "admin") throw new Error("No admin");
  // if (!refreshToken) throw new Error("No refreshToken");

  // add a property
  // req.user = session.user;

  // out
  // await next();
};

export const checkRoles = (roles: any) => {
  return async (req: any, res: any, next: any) => {
    // console.log("\n<middleware/checkRoles>");
    // console.log({ "req.user.role": req.user.role });
    // console.log({ "req.user": req.user });

    if (!roles.includes(req.user.role)) {
      throw new Error(`Role (${req.user.role}) is not allowed to access this resource.`);
    }

    await next();
  };
};
