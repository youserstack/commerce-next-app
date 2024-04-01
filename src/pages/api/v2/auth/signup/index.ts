import connectDB from "lib/server/config/connectDB";
import { signup } from "lib/server/controllers/authControllers";
import { createRouter } from "next-connect";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/auth/signup]`);
    await next();
  })
  .post(signup);

export default router.handler();
