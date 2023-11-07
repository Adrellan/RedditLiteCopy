import test from "node:test";
import {Post} from "../models/post.model";
import dotenv from "dotenv";
import {db} from "../config/db.config";

dotenv.config()


test("Post - Insert", async (t) => {
	await db.init()

	const newPost = new Post({
		active: true,
		created: new Date(),
		title: "Test Title_231102",
		updated: new Date(),
		content: "Content 123"
	})
	await newPost.save();

})