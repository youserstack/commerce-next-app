import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { refresh } from "lib/server/controllers/authControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/auth/refresh]\x1b[32m`);
    await next();
  })
  .get(refresh);

export default router.handler();
