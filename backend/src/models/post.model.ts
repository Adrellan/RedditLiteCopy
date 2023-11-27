import {model, Model, Schema} from "mongoose"
import {baseEntityModel, IBaseEntity} from "./baseEntity.model";
import {autopopulatePlugin} from "../config/db.config";
export interface IPost extends IBaseEntity {
	title: string,
	content: string,
	author: {
		type: Schema.Types.ObjectId, ref: "User"
	},
	comments?: [{
		type: Schema.Types.ObjectId, ref: "Comment"
	}]
}
interface PostModel extends Model<IPost> {
	findActives(): any
}

export const postScheme = new Schema<IPost, PostModel>({
	title: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		autopopulate: {select:'userName fullName email'},
	},
	comments: [{
		type: Schema.Types.ObjectId, ref: "Comment", autopopulate: true
	}],
	content: String,
	...baseEntityModel
})
postScheme.plugin(autopopulatePlugin)


postScheme.statics.findActives = function () {
	return this.find({active: true})
}

// Post model
export const Post = model<IPost, PostModel>("Post", postScheme, "posts");



