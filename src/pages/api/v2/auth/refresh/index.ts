import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { refresh } from "lib/server/controllers/authControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\n[api/v2/auth/refresh]`);
    await next();
  })
  .get(refresh);

export default router.handler();
