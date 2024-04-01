import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/models/Order";
import Product from "lib/server/models/Product";
import User from "lib/server/models/User";
import verifyJWT from "lib/server/utils/verifyJWT";

connectDB();

export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/pay]:::[", req.method, "]");
  switch (req.method) {
    case "POST":
      await payForOrder(req, res);
      break;
    default:
      break;
  }
}

const payForOrder = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // console.log({ verified });
    // get the order information
    // const { address, mobile, cart, total } = req.body;
    const { _id, paymentId } = req.body;
    // find
    const foundOrder = await Order.findById(_id).exec();
    if (!foundOrder) return res.status(404).json({ message: "Not found" });
    // save
    foundOrder.paymentId = paymentId;
    foundOrder.paid = true;
    foundOrder.dateOfPayment = new Date().toISOString();
    foundOrder.method = "paypal";
    const savedOrder = await foundOrder.save();
    // out
    console.log({ savedOrder });
    return res.status(200).json({ paidOrder: savedOrder });
  } catch (error: any) {
    console.log("error : ", error);
    return res.status(500).json({ error: error.message });
  }
};
