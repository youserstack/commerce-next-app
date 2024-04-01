import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import { createOrder, getOrder } from "lib/server/controllers/orderControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/order]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["admin", "user"]))
  .get(getOrder)
  .post(createOrder);

export default router.handler();
