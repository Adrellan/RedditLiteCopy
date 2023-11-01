import {Schema,Model} from "mongoose"


const PostScheme = new Schema({
	title: String,
	author: [{
		type: Schema.Types.ObjectId, ref: "User"
	}],
	content: String,
})


// Post model
export const PostModel = new Model("Post", PostScheme);

