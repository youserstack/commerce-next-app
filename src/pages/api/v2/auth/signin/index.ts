import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { signin } from "lib/server/controllers/authControllers";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res, next) => {
    console.log(`\n[api/v2/auth/signin]`);
    await next();
  })
  .post(signin);
export default router.handler();
