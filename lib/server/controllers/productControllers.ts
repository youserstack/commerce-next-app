import Product from "lib/server/models/Product";
import APIfeatures from "lib/server/utils/APIfeatures";

// single
export const createProduct = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<createProduct>\x1b[30m`);
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
export const createProductReview = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createProductReview>\x1b[30m`);

  // get
  const { id } = req.query;
  const review = req.body;

  // update
  const product = await Product.findById(id);
  // const updatedProduct = await Product.findByIdAndUpdate(
  //   id,
  //   { $push: { reviews: req.body } },
  //   // { $push: { reviews: review } },
  //   { new: true }
  // );
  // updatedProduct.reviews.reduce((sum:any,review:any)=>sum+review.rating,0)

  product.reviews.push(review);

  const totalRating = product.reviews.reduce((sum: any, review: any) => sum + review.rating, 0);
  const averageRating: any = totalRating / product.reviews.length;
  product.ratings = parseFloat(averageRating.toFixed(1));

  await product.save();

  // out
  console.log({ product });
  return res.status(200).json({ product });
};
export const getProduct = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<getProduct>\x1b[30m`);

  const product = await Product.findById(req.query.id);
  if (!product) res.status(404).json({ message: "Not found" });

  res.status(200).json({ product });
};
export const deleteProduct = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProduct>\x1b[30m`);
  // get
  const { id } = req.query;
  // delete
  const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
  // out
  console.log({ deletedProduct });
  return res.status(200).json({ deletedProduct });
};

// multiple
export const getProducts = async (req: any, res: any, next: any) => {
  // log
  console.log(`\x1b[32m\n<getProducts>\x1b[30m`);
  console.log({ query: req.query });

  // set
  const ITEMS_PER_PAGE = 3; // 페이지 당 아이템 수
  const page = req.query.page || 1; // 요청된 페이지
  const skip = (page - 1) * ITEMS_PER_PAGE; // 스킵할 아이템 수
  // const query = req.query;
  // console.log({ query });
  let query: any = {};
  const { search, category, ratings } = req.query;
  if (search) query.name = { $regex: search };
  if (category && category !== "all") query.category = { $regex: category };
  if (ratings) {
    const ratingsArray = ratings.split("+").map((v: string) => Number(v));
    console.log({ ratingsArray });

    // query.ratings = { $in: ratingsArray };
    const min = Math.min(...ratingsArray);
    const max = Math.max(...ratingsArray);
    query.ratings = { $gte: min - 1, $lt: max };
  }

  console.log({ query });

  try {
    const productCount = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(ITEMS_PER_PAGE);
    const pageCount = Math.ceil(productCount / ITEMS_PER_PAGE);

    console.log({ products, productCount, productCountPerPage: ITEMS_PER_PAGE, pageCount });
    return res.status(200).json({
      products,
      pageCount,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "error...." });
  }
};
// export const getProducts = async (req: any, res: any, next: any) => {
//   // log
//   console.log(`\x1b[32m\n<getProducts>`);
//   console.log({ query: req.query });

//   // create a instance
//   const queryInstance = new APIfeatures(Product.find({}), req.query);

//   // apply filtering and paginating
//   // 쿼리의 필터조건설정
//   await queryInstance.filter().paginate();

//   // excute the query
//   const products = await queryInstance.queryProducts; // 쿼리
//   const totalPages = queryInstance.totalPages;

//   // paginate
//   // 완전히 새로운 작업을 할 때 clone method를 사용한다.
//   // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
//   // const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)

//   // out
//   console.log({ totalPages });
//   console.log({ products });
//   res.status(200).json({ products, pages: totalPages });
// };
// export const getProductsWithPagination = async (req: any, res: any, next: any) => {
//   console.log(`\x1b[32m\n<getProducts>`);
//   // log
//   console.log({ query: req.query });

//   // get the total count of products
//   const totalProductCount = await Product.countDocuments();
//   console.log({ totalProductCount });

//   // make the queryInstance = Product.find({})
//   const queryInstance = new APIfeatures(Product.find({}), req.query);

//   // filter
//   queryInstance.filter(); // 쿼리의 필터조건설정
//   const filteredProducts = await queryInstance.queryProducts; // 쿼리
//   const filteredProductCount = filteredProducts.length; // 필터링한 총 제품의 수
//   // console.log({ filteredProductCount });

//   // paginate
//   queryInstance.paginate(); // 쿼리의 페이지네이션설정
//   // 완전히 새로운 작업을 할 때 clone method를 사용한다.
//   // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
//   const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)
//   const totalPages = Math.ceil(filteredProductCount / 3);
//   console.log({ paginatedProducts });
//   console.log({ totalPages });

//   // out
//   res.status(200).json({ products: paginatedProducts, pages: totalPages });
// };
export const deleteProducts = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProducts>\x1b[30m`);
  const { ids } = req.body;
  const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ deletedProducts });
};
export const deleteProductReviews = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProductReview>\x1b[30m`);

  // get
  const { id: productId } = req.query;
  const { reviewIds } = req.body;
  console.log({ productId, reviewIds });

  // return res.status(200).json({ test: "test" });

  // delete
  const updatedProducts = await Product.findByIdAndUpdate(
    productId,
    { $pull: { reviews: { _id: { $in: reviewIds } } } },
    { new: true }
  );
  // const updatedProducts = await Product.deleteMany({ reviews: { _id: { $in: ids } } });

  // out
  console.log({ updatedProducts });
  return res.status(200).json({ updatedProducts });
};
