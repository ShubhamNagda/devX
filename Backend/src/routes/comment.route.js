import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/create-comment/:postId").post(verifyJWT, createComment);
router.route("/update-comment/:commentId").patch(verifyJWT, updateComment);
router.route("/get-all-comments/:postId").get(getPostComments);
router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
