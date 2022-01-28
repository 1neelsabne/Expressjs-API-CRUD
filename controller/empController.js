//import mongoose from "mongoose";
import empSchema from "../db/empSchema.js";

export const getData = async () => await empSchema.find({});

export const postData = async (data) => {
  let insert = await new empSchema(data);
  insert.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const deleteData = async (email) =>
  await empSchema.deleteOne({ email: email });

export const putData = async (email, data) =>
  await empSchema.findOneAndUpdate({ email: email }, data);

//export default { getData, postData, deleteData, putData };
