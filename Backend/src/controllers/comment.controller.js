import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// create comment
const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!postId || !content?.trim()) {
    throw new ApiError(400, "Post ID and content are required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const comment = await Comment.create({
    owner: req.user._id,
    post: postId,
    content: content.trim(),
  });

  const createdComment = await Comment.findById(comment._id).populate(
    "owner",
    "fullName profile",
  );

  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdComment, "Commented successfully"));
});

//update comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId || !content?.trim()) {
    throw new ApiError(400, "Comment id and content are required");
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      owner: req.user._id,
    },
    {
      $set: {
        content: content.trim(),
      },
    },
    {
      returnDocument: "after",
    },
  ).populate("owner", "fullName profile");

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated"));
});

const getPostComments = asyncHandler(async (req, res) => {
  console.log("Got request")
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const comments = await Comment.find({ post: postId })
    .populate("owner", "fullName profile")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (!comment.owner.equals(req.user._id)) {
    throw new ApiError(403, "You are not allowed to delete this comment");
  }

  await Comment.deleteOne({ _id: commentId, owner: req.user._id });

  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: -1 },
  });

  return res.status(200).json(new ApiResponse(200, {}, "Comment deleted"));
});

export { createComment, updateComment, getPostComments, deleteComment };
