import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "postId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const postToLike = await Post.findById(postId);

  if (!postToLike) {
    throw new ApiError(404, "post does not exist or deleted by user");
  }

  const isAlreadyLiked = await Like.findOne({
    post: postToLike._id,
    user: req.user._id,
  });

  if (isAlreadyLiked) {
    throw new ApiError(409, "Post already liked");
  }

  await Like.create({
    post: postToLike._id,
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Post liked successfully"));
});

const unlikePost = asyncHandler(async (req, res) => {
  const postToUnlike = await Post.findById(req.params?.postId);

  if (!postToUnlike) {
    throw new ApiError(404, "post does not exist or deleted by user");
  }

  const existingLike = await Like.findOne({
    post: postToUnlike._id,
    user: req.user._id,
  });

  if (!existingLike) {
    throw new ApiError(404, "Post is not liked");
  }

  await Like.deleteOne({
    post: postToUnlike._id,
    user: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post unliked successfully"));
});

export { likePost, unlikePost };
