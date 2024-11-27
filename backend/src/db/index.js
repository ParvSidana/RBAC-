import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    // console.log(connectionInstance);
    console.log(
      `\n Database connected! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
