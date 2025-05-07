import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Comment = model("Comment", commentSchema);
