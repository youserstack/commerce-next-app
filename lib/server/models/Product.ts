import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      // enum: {
      //   values: ["electronics", "fashion", "food"],
      //   message: "Please select correct category",
      // },
    },
    name: {
      type: String,
      required: true,
      trim: true, // 좌우 공백 제거
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      required: true,
    },
    // not required
    sold: {
      type: Number,
      default: 0,
    },
    // ratings 를 ratingsAverage 로 renaming 이 필요해보임.
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          images: {
            type: [
              {
                url: {
                  type: String,
                },
              },
            ],
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    // images: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: true }
);

// // 제품이 저장될 때마다 reviews 배열의 rating 값을 취합하여 평균값을 계산하고 ratings 필드에 저장
// productSchema.pre("save", function (next) {
//   const totalRatings = this.reviews.reduce((sum, review) => sum + review.rating, 0);
//   const averageRating = totalRatings / this.reviews.length;
//   console.log({ totalRatings, averageRating });
//   this.ratings = averageRating;
//   next();
// });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
