import { Router } from "express";
import {
  addProfilePic,
  changePassword,
  getCurrentUser,
  loginUser,
  logOut,
  refreshAccessToken,
  registerUser,
  updateProfileInfo,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOut);
router
  .route("/profilepic")
  .patch(verifyJWT, upload.single("profilepic"), addProfilePic);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/update-user-info").patch(verifyJWT, updateProfileInfo);

export default router;
