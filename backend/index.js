import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

import authRoutes from "./src/routes/authroutes.js";
// routes
app.use("/api/auth", authRoutes);

import userRoutes from "./src/routes/userRoleroutes.js";
// userRoles
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Error", err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in index connecting Database", err);
  });
