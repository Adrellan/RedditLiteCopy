import {Model, model, Schema} from "mongoose";
import {baseEntityModel, IBaseEntity} from "./baseEntity.model";
import {autopopulatePlugin} from "../config/db.config";

export interface IComment extends IBaseEntity {
	text: string,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: "Post",
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment",
		autopopulate: true
	}],
}

interface CommentModel extends Model<IComment>{
    findActives(): any
}

export const commentScheme = new Schema<IComment, CommentModel>({
	text: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		autopopulate: {select:'userName fullName email'},

	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment",
		autopopulate: true
	}],
	post: {
		type: Schema.Types.ObjectId,
		ref: "Post",

	},
	//TODO: Extend the model accordingly

	...baseEntityModel
});

commentScheme.plugin(autopopulatePlugin)

commentScheme.statics.findActives = function(){
  return this.find({active:true})
}

export const Comment = model<IComment, CommentModel>("Comment", commentScheme, "comments");