import mongoose from "mongoose";
import colors from "colors";

export default async function connectDB() {
  // console.log({ "mongoose.connection": mongoose.connection });

  if (mongoose.connection.readyState >= 1) {
    // console.log(`\x1b[33m\n[connectDB:${mongoose.connection.name}]\x1b[30m`);
    // console.log("\x1b[32mAlready connected\x1b[30m");
    return;
  }
  //   if (mongoose.connections[0].readyState) {
  //     // console.log("\n\x1b[33mMongoDB is already connected");
  //     return;
  //   }

  const config = {
    dbName: "e-commerce",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  // try {
  //   await mongoose.connect(process.env.MONGODB_URI, config);
  //   console.log("\x1b[32mConnected\x1b[30m");
  // } catch (error) {
  //   console.log(error);
  // }

  return new Promise(async (resolve: any, reject: any) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, config);
      // console.log(
      //   colors.green(`[mongodb.connection.name] `) + colors.red(`${mongoose.connection.name}`)
      // );
      console.log(colors.green("mongodb connected..."));
      resolve();
    } catch (error) {
      console.log(colors.red("mongodb connection error..."));
      console.log(error);
      reject();
    }
  });
}
