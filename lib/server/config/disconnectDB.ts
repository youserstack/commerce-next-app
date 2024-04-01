import mongoose from "mongoose";

export default async function disconnectDB() {
  console.log(`\x1b[33m\n[disconnectDB:${mongoose.connection.name}]\x1b[0m`);

  try {
    await mongoose.disconnect();
    console.log("\n\x1b[33mDisconnected\n");
  } catch (error) {
    console.log(error);
  }
}
