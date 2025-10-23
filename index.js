import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";

dotenv.config({
  path: "./.env",
});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// -- connecting db and eventually starting server using callback

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started at PORT :" + PORT);
    });
  })
  .catch((e) => {
    console.log("Error occured", e);
  });

// ---------------------------------------------------

app.use("api/v1",router);
//  ----------------------------------------------
