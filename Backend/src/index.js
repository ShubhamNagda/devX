import "dotenv/config";
import express from "express";
import { app } from "./app.js";
import { connectDB } from "./db/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ");
  });
