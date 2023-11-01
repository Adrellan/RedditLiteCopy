import {Schema,Model} from "mongoose"
import {baseEntityModel} from "./baseEntity.model";



const PostScheme = new Schema({
	title: String,
	author: [{
		type: Schema.Types.ObjectId, ref: "User"
	}],
	content: String,
	//TODO: Extend the model accordingly

	// Base entity
	...baseEntityModel
})


// Post model
export const PostModel = new Model("Post", PostScheme);

