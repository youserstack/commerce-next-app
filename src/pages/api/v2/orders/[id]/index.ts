import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkRoles, checkAuth } from "lib/server/middlewares/authMiddlewares";
import { deleteOrder, getOrder } from "lib/server/controllers/orderControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[33m\n[api/v2/orders/${req.query.id}]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["user", "admin"]))
  .get(getOrder)
  .delete(deleteOrder);

export default router.handler();
