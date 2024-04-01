import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import verifyJWT from "lib/server/utils/verifyJWT";

connectDB();

export default async function handler(req: any, res: any) {
  console.log(`\x1b[32m\n[api/products/${req.query.id}]`);
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
}
const getProduct = async (req: any, res: any) => {
  try {
    // get
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Not found" });
    // out
    console.log({ "product.name": product.name });
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const updateProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // update
    const { id } = req.query;
    const { name, price, description, category, images, seller, stock } = req.body;
    if (
      !name ||
      !price ||
      !description ||
      category === "all" ||
      images.length === 0 ||
      !seller ||
      !stock
    )
      return res.status(400).json({ message: "Please add all the fields." });
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name: name.toLowerCase(),
        price,
        description,
        category,
        images,
        seller,
        stock,
      },
      { new: true }
    );
    // const updatedProduct=await foundProduct.save()
    // out
    console.log({ updatedProduct: updatedProduct });
    return res.json({ updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const deleteProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // delete
    const { id } = req.query;
    const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
    // out
    console.log({ deletedProduct: deletedProduct });
    return res.status(200).json({ deleteProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
