declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      MONGODB_URI: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
    // interface Global {
    //   _mongoClientPromise: Promise<MongoClient> | undefined | null;
    // }
  }
}

export {};
