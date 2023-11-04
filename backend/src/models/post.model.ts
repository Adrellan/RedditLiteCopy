import {Schema, model, Model, Query} from "mongoose"
import {baseEntityModel, IBaseEntity} from "./baseEntity.model";

interface IPost extends IBaseEntity{
	name: string;
	title: string,
	author: [{
		type: Schema.Types.ObjectId, ref: "User"
	}],
	content: string
}
interface PostModel extends Model<IPost> {
	findActives(): any
}

export const postScheme = new Schema<IPost, PostModel>({
	...baseEntityModel
})
postScheme.statics.findActives = function(){
	return this.find({active:true});
}



// Post model
export const Post = model<IPost, PostModel>("Post", postScheme);


