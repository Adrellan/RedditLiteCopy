import { Schema, Model } from "mongoose";
import { baseEntityModel } from "./baseEntity.model";

const CommentScheme = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  //TODO: Extend the model accordingly
  
  ...baseEntityModel,
});

export const CommentModel = new Model("Comment", CommentScheme);