import mongoose, { Schema } from "mongoose";

const followShema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

followShema.index({ follower: 1, followed: 1 }, { unique: true }); // same user can't follow many times

export const Follow = mongoose.model("Follow", followShema);
