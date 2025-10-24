import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
    .then(() => console.log("MongoDB has been connected"))
    .catch((e) => {
      console.log("Error occured while connecting the db", e);
    });
};

export {connectDB};
