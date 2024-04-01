import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import { getOrders } from "lib/server/controllers/orderControllers";

connectDB();
const router = createRouter();
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/orders]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["user"]))
  .get(getOrders);
// protected routes
// .delete(deleteProducts);

export default router.handler();
