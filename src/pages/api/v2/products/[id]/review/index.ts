import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import {
  createProductReview,
  deleteProductReviews,
} from "lib/server/controllers/productControllers";
import { checkRoles, checkAuth } from "lib/server/middlewares/authMiddlewares";

connectDB();

const router = createRouter()
  .use(async (req: any, res: any, next: any) => {
    console.log(`\n[api/v2/products/${req.query.id}/review]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["user"]))
  .post(createProductReview)
  .use(checkAuth, checkRoles(["admin"]))
  .delete(deleteProductReviews);

export default router.handler();
