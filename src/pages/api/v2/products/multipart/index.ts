import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import {
  uploadImagesToServer,
  uploadImagesToCloudinary,
} from "lib/server/middlewares/uploadMiddlewares";
import { createProduct } from "lib/server/controllers/productControllers";
import { PageConfig } from "next";

connectDB();

const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\n[api/v2/products/multipart]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["admin", "user"]))
  // handle the multipart data
  .use(uploadImagesToServer)
  .post(uploadImagesToCloudinary)
  .post(createProduct);

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default router.handler();
