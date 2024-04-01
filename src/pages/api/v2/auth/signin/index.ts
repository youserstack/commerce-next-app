import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { signin } from "lib/server/controllers/authControllers";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/auth/signin]\x1b[32m`);
    await next();
  })
  .post(signin);
export default router.handler();
