import mongoose from "mongoose";
export async function connect(request) {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(connection.host);
  } catch (error) {
    console.log(error);
  }
}
