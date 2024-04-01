export default class APIfeatures {
  queryProducts: any;
  queryString: any;
  totalPages: number = 0;

  constructor(queryProducts: any, queryString: any) {
    this.queryProducts = queryProducts;
    this.queryString = queryString;
  }

  filter() {
    const { search, category, ratings } = this.queryString;
    let filterConditions: any = {};

    if (search) filterConditions.name = { $regex: search };
    if (category && category !== "all") filterConditions.category = { $regex: category };
    if (ratings) {
      const ratingsArray = ratings.split("+").map((v: string) => Number(v));
      filterConditions.ratings = { $in: ratingsArray };
      // ratingsArray.map((value: any) => {
      //   this.queryProducts.find().or({ ratings: value });
      //   // this.queryProducts.find().or({ ratings: { $gte: value } });
      // });
    }

    this.queryProducts.find(filterConditions);
    // if (test) {
    //   const testArray = test.split("+");
    //   console.log({ testArray });
    //   // this.queryProducts.find({ name: { $or: testArray } });
    //   testArray.map((value: any) => {
    //     this.queryProducts.find().or({ name: { $regex: value } });
    //   });
    // }
    // if (ratings) this.queryProducts.find({ ratings: { $regex: Number(ratings) } });
    return this;
  }
  // filter() {
  //   // const searchQueries = { ...this.queryString };
  //   // console.log({ searchQueries });

  //   // const queryCopy = { ...this.queryString };
  //   // const removeFields = ["keyword", "page"];
  //   // removeFields.forEach((el) => delete queryCopy[el]);
  //   // let output:any = {};
  //   // let prop = "";
  //   // for (let key in queryCopy) {
  //   //   if (!key.match(/\b(gt|gte|lt|lte)/)) {
  //   //     output[key] = queryCopy[key];
  //   //   } else {
  //   //     prop = key.split("[")[0];
  //   //     let operator = key.match(/\[(.*)\]/)[1];
  //   //     if (!output[prop]) {
  //   //       output[prop] = {};
  //   //     }
  //   //     output[prop][`$${operator}`] = queryCopy[key];
  //   //   }
  //   // }
  //   // // { price: { $gte: 100, $lte: 1000 } }
  //   // this.queryProducts = this.queryProducts.find(output);
  //   return this;
  // }
  async paginate() {
    // 요청된 페이지
    const page: number = Number(this.queryString.page) || 1;
    // 페이지 당 아이템
    const limit: number = 3;
    // 쿼리에서 스킵할 아이템
    const skip = (page - 1) * limit;

    // paginate
    this.queryProducts = this.queryProducts.skip(skip).limit(limit);
    const totalDocs = await this.queryProducts.model.countDocuments(this.queryProducts.getQuery());
    console.log({ totalDocs });
    this.totalPages = Math.ceil(totalDocs / limit);

    // console.log({ queryProducts: this.queryProducts, totalPages: this.totalPages });

    return this;
  }
}
