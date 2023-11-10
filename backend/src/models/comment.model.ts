import { Schema, Model, model } from "mongoose";
import { IBaseEntity, baseEntityModel } from "./baseEntity.model";

export interface IComment extends IBaseEntity{
    text : string,
    author: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
    }],
    post: [{  
      type: Schema.Types.ObjectId,
      ref: "Post",   
    }]
}

interface CommentModel extends Model<IComment>{
    findActives(): any
}

export const commentScheme = new Schema<IComment, CommentModel>({
  text: String,
  author: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
  }],
  //TODO: Extend the model accordingly
  
  ...baseEntityModel
});

commentScheme.statics.findActives = function(){
  return this.find({active:true});
}

export const Comment = model<IComment, CommentModel>("Comment", commentScheme);