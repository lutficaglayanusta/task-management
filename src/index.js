import { connectMongoDB } from "./db/connectMongoDB.js";
import { startServer } from "./server.js";

const bootStrap = async () => {
  await connectMongoDB();
  startServer();
};

bootStrap();
