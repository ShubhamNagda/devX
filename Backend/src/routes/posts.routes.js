import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUsersPost,
  updatePost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/createpost")
  .post(verifyJWT, upload.array("images", 10), createPost);
router.route("/updatepost/:postId").patch(verifyJWT, updatePost);
router.route("/deletepost/:postId").delete(verifyJWT, deletePost);
router.route("/getallposts").get(verifyJWT, getAllPosts);
router.route("/getuserposts").get(verifyJWT, getUsersPost);

export default router;
