import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import {
  uploadImagesToServer,
  uploadReviewImagesToCloudinary,
} from "lib/server/middlewares/uploadMiddlewares";
import { PageConfig } from "next";
import { createProductReview } from "lib/server/controllers/productControllers";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/products/${req.query.id}/review/multipart]:::[${req.method}]`);
    await next();
  })
  // protected routes
  .use(checkAuth, checkRoles(["admin", "user"]))
  // handle the multipart data
  .use(uploadImagesToServer)
  .use(uploadReviewImagesToCloudinary)
  .post(createProductReview);

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default router.handler();
