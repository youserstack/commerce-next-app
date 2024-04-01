import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import { getProducts, deleteProducts } from "lib/server/controllers/productControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/products]:::[${req.method}]`);
    await next();
  })
  .get(getProducts)
  .use(checkAuth, checkRoles(["admin"]))
  .delete(deleteProducts);

export default router.handler();
