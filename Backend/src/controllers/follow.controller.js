import mongoose from "mongoose";
import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//follow user
const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const userToFollow = await User.findById(userId);

  if (!userToFollow) {
    throw new ApiError(404, "User not found");
  }

  if (req.user._id.toString() === userId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  const alreadyFollowing = await Follow.findOne({
    followed: userId,
    follower: req.user._id,
  });

  if (!!alreadyFollowing) {
    throw new ApiError(409, "Already following this user");
  }
  await Follow.create({
    followed: userId,
    follower: req.user._id,
  });

  await User.findByIdAndUpdate(userId, {
    $inc: { followers: 1 },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { following: 1 },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "user followed successfully"));
});

//unfollow user
const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid userId");
  }
  const userToUnfollow = await User.findById(userId);

  if (!userToUnfollow) {
    throw new ApiError(404, "User does not exist");
  }

  const followDoc = await Follow.findOne({
    followed: userId,
    follower: req.user._id,
  });

  if (!followDoc) {
    throw new ApiError(404, "You are not following this user");
  }

  await Follow.deleteOne({
    followed: userId,
    follower: req.user._id,
  });

  await User.findByIdAndUpdate(userId, {
    $inc: { followers: -1 },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { following: -1 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "user is now unfollowed"));
});

//check user is followed for not
const getFollowStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const otherUser = await User.findById(userId);
  if (!otherUser) {
    throw new ApiError(404, "user does not exist");
  }
  const isFollowed = await Follow.exists({
    follower: req.user._id,
    followed: userId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isFollowing: !!isFollowed },
        isFollowed ? "User followed" : "User not followed",
      ),
    );
});

//get followers
const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "user does not exist");
  }
  const followers = await Follow.find({ followed: userId })
    .populate("follower", "username fullName profile")
    .select("follower");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count: followers.length, followers },
        "followers fetched successfully",
      ),
    );
});

// get Following
const getFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  const following = await Follow.find({ follower: userId })
    .populate("followed", "username fullName profile")
    .select("followed");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count: following.length, following },
        "following fetched successfully",
      ),
    );
});

export {
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
};
