

import {Router} from "express"

const router = Router();



router.get("", (req, res)=>{
	//TODO: Implement to get all the ACTIVE posts from the MongoDB
	res.status(200).send("Sok poszt van itten")
})

router.get("/:postId", (req,res)=>{
	//TODO: Get the detailed detailed version of the post by Id
})

router.post("/", (req,res)=>{
	//TODO: Implement to create a new post and set the author as the current user principle!
})

router.put("/:postId", (req,res)=>{
	//TODO: Implement a modification for the according POST
})

router.delete("/", (req,res)=>{
	//TODO: Implement a logical DELETE for the post.
})


export default router;



