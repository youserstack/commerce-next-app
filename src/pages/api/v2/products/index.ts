import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import { getProducts, deleteProducts } from "lib/server/controllers/productControllers";

connectDB();

const router = createRouter()
  .get(getProducts)
  .use(checkAuth, checkRoles(["admin"]))
  .delete(deleteProducts);

export default router.handler();
