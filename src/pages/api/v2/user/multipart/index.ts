import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import {
  uploadImagesToServer,
  uploadImagesToCloudinary,
} from "lib/server/middlewares/uploadMiddlewares";
import { updateUser } from "lib/server/controllers/userControllers";
import { PageConfig } from "next";

connectDB();

// set the router
const router = createRouter()
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/user/multipart]:::[${req.method}]`);
    await next();
  })
  .use(checkAuth, checkRoles(["admin", "user"]))
  .use(uploadImagesToServer)
  .use(uploadImagesToCloudinary)
  .patch(updateUser);

// out the configuration and handler
export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default router.handler();
