import mongoose from "mongoose";
const db = "mongodb://localhost:27017/Employee";
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
