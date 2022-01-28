import express from "express";
import router from "./routes/empRoutes.js";
import connectDB from "./config/db.js";
import colors from "colors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

connectDB();

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Working on Port ${PORT}`.blue);
});
