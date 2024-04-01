import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import verifyJWT from "lib/server/utils/verifyJWT";

connectDB();

export default async function handler(req: any, res: any) {
  console.log(`\x1b[32m\n[api/product]`);
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
    case "DELETE":
      await deleteProducts(req, res);
      break;
  }
}
const getProducts = async (req: any, res: any) => {
  try {
    // get
    // console.log("req.query : ", req.query);
    // const instance = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
    // const data = await instance.products;
    const products: any = await Product.find().exec();
    if (!products) return res.status(404).json({ message: "Not found" });
    // console.log({ products });
    console.log(
      products.map((product: any) => ({
        _id: product._id,
        name: product.name,
      }))
    );
    return res.status(200).json({ products: products });
    // if (req.query) {
    //   const { productPage, productCount, sort } = req.query;
    //   const page = Number(productPage) || 1;
    //   const limit = Number(productCount) || 3;
    //   const skip = (page - 1) * limit;
    //   console.log({ page, limit, skip });
    //   const products = await Product.find().skip(skip).limit(limit);
    //   // const slicedProducts = products.slice(0, Number(`${productCount}`));
    //   // console.log(
    //   //   "slicedProducts : ",
    //   //   slicedProducts.map((product: any) => product.name)
    //   // );
    //   // const productsTitles = products.map((v: any) => ({ name: v.name, stock: v.stock }));
    //   // console.log("productsTitles : ", productsTitles);
    //   return res.status(200).json({ products });
    // }
    // const products = await Product.find();
    // return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const createProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // create
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
    const newProduct = await Product.create({
      name: name.toLowerCase(),
      price,
      description,
      category,
      images,
      seller,
      stock,
    });
    // out
    console.log("newProduct : ", newProduct);
    return res.status(200).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteProducts = async (req: any, res: any) => {
  try {
    // delete
    const { ids } = req.body;
    console.log("ids : ", ids);
    let deletedProducts = [];
    for (let id of ids) {
      const deletedProduct = await Product.findByIdAndDelete(id, { new: true }).exec();
      console.log("deletedProduct : ", deletedProduct);
      deletedProducts.push(deletedProduct);
    }
    // out
    return res.status(200).json({ deletedProducts });
  } catch (error) {
    console.log("deleteProducts error : ", error);
  }
};
class APIfeatures {
  products: any;
  queryString: any;
  constructor(products: any, queryString: any) {
    this.products = products;
    this.queryString = queryString;
  }
  filtering() {
    // get
    const { category, search } = this.queryString;
    // filter
    if (category && category !== "all") this.products.find({ category: category });
    if (search) this.products.find({ name: { $regex: search } });
    // out
    return this;
  }
  sorting() {
    if (this.queryString.sort === "newest") this.products = this.products.sort({ createdAt: 1 });
    if (this.queryString.sort === "oldest") this.products = this.products.sort({ createdAt: -1 });
    return this;
  }
  paginating() {
    // set
    const page: number = Number(this.queryString.page) || 1;
    const limit: number = page * 3 || 3;
    const skip: number = 0;
    // const limit: number = Number(this.queryString.limit) || 3;
    // const skip: number = (page - 1) * limit;
    console.log({ page, limit, skip });
    // paginate
    this.products = this.products.skip(skip).limit(limit);
    // out
    return this;
  }
}
// 예시 사용
// const apiFeatures = new APIfeatures(products, queryString);
// apiFeatures.filtering().sorting().paginating();
// const results = apiFeatures.products;
