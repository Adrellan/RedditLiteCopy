import test, {before, describe, it} from "node:test";
import {Post, postScheme} from "../models/post.model";
import mongoose from "mongoose";
import {db} from "../config/db.config";
import dotenv from "dotenv";
import assert from "node:assert/strict";

dotenv.config()



describe(`Post - finds`,  async ()=>{
	before(async ()=>{
		await db.init();
	})

	it("findActives", async (t)=>{
		const posts = await Post.findActives();
		assert.notEqual(posts.length, 0)
	})

})
