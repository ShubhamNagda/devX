import { likePost, unlikePost } from "../controllers/like.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:postId")
  .post(verifyJWT, likePost)
  .delete(verifyJWT, unlikePost);

export default router;
