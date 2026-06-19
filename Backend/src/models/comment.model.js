import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ post: 1 });

commentSchema.index({ owner: 1 });

export const Comment = mongoose.model("Comment", commentSchema);
