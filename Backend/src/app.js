import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// ------------- for user ---------------------->
import userRoute from "./routes/user.routes.js";
app.use("/api/v1/users", userRoute);

// ------------- for posts ---------------------->
import postsRoute from "./routes/posts.routes.js";
app.use("/api/v1/posts", postsRoute);

// for likes
import likeRoute from "./routes/like.routes.js";
app.use("/api/v1/likes", likeRoute);

//for comments
import commentRoute from "./routes/comment.route.js";
app.use("/api/v1/comments", commentRoute);

//for follow
import followRoute from "./routes/follow.routes.js";
app.use("/api/v1/follows", followRoute);

export { app };
