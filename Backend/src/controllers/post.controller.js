import { Post } from "../models/post.model.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const hasContent = content?.trim();
  const hasImages = req.files?.length > 0;

  if (!hasContent && !hasImages) {
    throw new ApiError(400, "Post must contain content or at least one image");
  }

  const uploadedImages = [];

  for (const file of req.files || []) {
    const result = await uploadOnCloudinary(file.path);

    if (!result) {
      throw new ApiError(500, "Failed to upload image");
    }

    uploadedImages.push({
      url: result.secure_url,
      public_id: result.public_id,
    });
  }

  const post = await Post.create({
    content,
    owner: userId,
    images: uploadedImages,
  });

  if (!post) {
    throw new ApiError(500, "post is not creating");
  }

  const createdPost = await Post.findById(post._id).populate(
    "owner",
    "profile username ",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdPost, "Post created successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content?.trim()) {
    throw new ApiError(400, "Content is required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (!post.owner.equals(userId)) {
    throw new ApiError(403, "You are not allowed to update this post");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $set: { content },
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate("owner", "profile username ");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  if (!postId) {
    throw new ApiError(400, "postId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (!post.owner.equals(userId)) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  for (const file of post.images) {
    await deleteFromCloudinary(file.public_id);
  }

  await Post.findByIdAndDelete(postId);

  return res.status(200).json(new ApiResponse(200, {}, "Post is deleted"));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("owner", "fullName profile")
    .lean();

  const postIds = allPosts.map((post) => post._id);

  const userLikes = await Like.find({
    user: req.user._id,
    post: { $in: postIds },
  }).select("post");

  const likedPostIds = new Set(userLikes.map((like) => like.post.toString()));

  const postsWithLikeStatus = allPosts.map((post) => ({
    ...post,
    isLiked: likedPostIds.has(post._id.toString()),
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        postsWithLikeStatus,
        "All posts fetched successfully",
      ),
    );
});

const getUsersPost = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const posts = await Post.find({ owner: userId })
    .populate("owner", "profile fullName")
    .lean();

  const postIds = posts.map((post) => post._id);

  const userLikes = await Like.find({
    user: req.user._id,
    post: { $in: postIds },
  }).select("post");

  const likedPostIds = new Set(userLikes.map((like) => like.post.toString()));

  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: likedPostIds.has(post._id.toString()),
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, postsWithLikeStatus, "posts fetched successfully"),
    );
});

export { createPost, updatePost, deletePost, getAllPosts, getUsersPost };
