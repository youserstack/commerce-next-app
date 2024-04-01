import Product from "lib/server/models/Product";
import Order from "lib/server/models/Order";
import User from "lib/server/models/User";

// single
export const createOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createOrder>\x1b[30m`);

  try {
    // get the order
    console.log({ "req.body": req.body });
    const { User, productInfo, deliveryInfo, payInfo } = req.body;
    const { payType } = payInfo;

    const handleOrderWithPrepay = async () => {
      // get the id and quantity of product
      console.log("checking stock...");
      const { productId, options }: any = productInfo;
      const { quantity } = options[0];

      // find the product
      const foundProduct: any = await Product.findById(productId).exec();
      if (!foundProduct) throw new Error("No found product");
      if (foundProduct.stock < quantity)
        throw new Error("The quantity in stock is less than what was ordered.");
      if (!foundProduct.stock) throw new Error("Out stock");

      // update the product properties
      foundProduct.stock -= quantity;
      foundProduct.sold += quantity;
      const savedProduct = await foundProduct.save();
      console.log({ savedProduct });

      // create an order
      const orderSheet = { User, productInfo, deliveryInfo, payInfo };
      console.log({ orderSheet });
      const order = await Order.create(orderSheet);
      console.log({ order });
      // paid: true,
      // dateOfPayment: details.create_time,
      // paymentId: details.paymentId,
      // method: "paypal",

      // out
      return res.status(200).json({ order });
    };

    const handleOrderWithPostpay = async () => {
      // create an order
      const orderSheet = { User, productInfo, deliveryInfo, payInfo };
      console.log({ orderSheet });
      const order = await Order.create(orderSheet);
      console.log({ order });

      // out
      return res.status(200).json({ order });
    };

    // payInfo에서 선결제인지 후결제인지 확인하여 분기한다.
    switch (payType) {
      case "prepay":
        handleOrderWithPrepay();
        break;
      case "postpay":
        handleOrderWithPostpay();
        break;

      default:
        break;
    }
  } catch (error: any) {
    console.log({ error });
    return res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<getOrder>`);

  // 개별주문건은 쿼리파라미터로부터 쿼리를 조회한다.
  const { id } = req.query;

  const order = await Order.findById(id).exec();

  return res.status(200).json({ order });
};

export const deleteOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteOrder>`);
  const { id } = req.query;
  const deletedOrder = await Order.findByIdAndDelete(id);
  console.log({ deletedOrder });
  return res.status(200).json({ deletedOrder });
};

// multiple
export const getOrders = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<getOrders>`);

  // 전체주문건은 사용자아이디로부터 쿼리를 조회한다.
  // (모든 주문을 조회하기 위한 유일한 식별자가 사용자아이디이기 때문에)
  const userId = req.user.id || req.user._id;

  const orders = await Order.find({ User: userId }).exec();
  // .populate({ path: "User" });
  console.log({ orders });

  return res.status(200).json({ orders });
};
