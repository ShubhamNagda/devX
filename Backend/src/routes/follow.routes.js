import { Router } from "express";
import {
  followUser,
  getFollowers,
  getFollowing,
  getFollowStatus,
  unfollowUser,
} from "../controllers/follow.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:userId")
  .post(verifyJWT, followUser)
  .delete(verifyJWT, unfollowUser);
router.route("/follow-status/:userId").get(verifyJWT, getFollowStatus);
router.route("/followers/").get(verifyJWT, getFollowers);
router.route("/following/").get(verifyJWT, getFollowing);

export default router;
