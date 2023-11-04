import {Router} from "express"
import {IPost, Post} from "../models/post.model";
import {setNewRecordInfo} from "../helpers/record.helper";
import {badRequest, Ok} from "../helpers/response.helper";
const router = Router();


router.get("", async (req, res) => {
	//TODO: Implement to get all the ACTIVE posts from the MongoDB
	try {
		const posts = await Post.findActives();
		Ok(res, posts)
	} catch (e) {
		badRequest(res, e);
	}

})

router.get("/:postId", async (req, res) => {
	//TODO: Get the detailed detailed version of the post by Id
	const {postId} = req.params

	try {
		const post = await Post.findById(postId);

		Ok(res, post);

	} catch (e) {
		badRequest(res, e);
	}
})

router.post("", async (req, res) => {
	//TODO: Implement to create a new post and set the author as the current user principle!
	try {
		const post = req.body as IPost;

		// set the record metadata info
		setNewRecordInfo(post);

		const newPost = new Post({...post});
		await newPost.save();

		Ok(res, newPost)
	} catch (e) {
		badRequest(res, e)
	}

})

router.put("/:postId", async (req, res) => {
	//TODO: Implement a modification for the according POST

	try {
		const {postId} = req.params;
		const modifiedPost = req.body as IPost;

		const updatedPost = await Post.findOneAndUpdate(
			{_id: postId},
			{...modifiedPost, updated: new Date()},
			{returnDocument: "after"}
		);

		Ok(res, updatedPost);
	} catch (e) {
		badRequest(res, e);
	}

})

router.delete("/:postId", async (req, res) => {
	try {
		const {postId} = req.params;

		const post = await Post.findById(postId);
		if (post == null) {
			badRequest(res, new Error(`Cannot find Post with id: ${postId}`))
			return;
		}

		post!.active = false;
		await post.save();
		Ok(res, post);
	} catch (e) {
		badRequest(res, e)
	}
})


export default router;



