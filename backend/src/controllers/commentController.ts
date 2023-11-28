import {Router} from "express";
import {Comment, IComment} from "../models/comment.model";
import {setNewRecordInfo} from "../helpers/record.helper";
import {badRequest, Ok} from "../helpers/response.helper";
import {authenticationMiddleware} from '../middlewares/authentication.mw';
import {Post} from "../models/post.model";


const router = Router();

router.get("/:postId", async (req, res) => {
  const { postId } = req.params ;
  try {
    const comments = await Comment.find({active:true, post: postId}).sort({created: "desc"});
    Ok(res, comments);
  } catch (e) {
    badRequest(res, e);
  }
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params ;

  try {
    const comment = await Comment.findById(commentId);

    Ok(res, comment);
  } catch (e) {
    badRequest(res, e);
  }
});

router.post("",authenticationMiddleware, async (req, res) => {
  try {
    const comment = req.body as IComment;
	  comment.author = (req as any).user.id
	  const post = await Post.findById(comment.post)
	  if (post === null) {
		  return
	  }
	  setNewRecordInfo(comment);

	  const newComment = new Comment({...comment});

	  await newComment.save();
	  post.comments = [...post.comments, newComment._id] as any
	  await post.save()


	  Ok(res, newComment);
  } catch (e) {
    badRequest(res, e);
  }
});

router.put("/:commentId", authenticationMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const modifiedComment = req.body as IComment;

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { ...modifiedComment, updated: new Date() },
      { returnDocument: "after" }
    );

    Ok(res, updatedComment);
  } catch (e) {
    badRequest(res, e);
  }
});

router.delete("/:commentId",authenticationMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (comment == null) {
      badRequest(res, new Error(`Cannot find Comment with id: ${commentId}`));
      return;
    }

    comment!.active = false;
    await comment.save();
    Ok(res, comment);
  } catch (e) {
    badRequest(res, e);
  }
});

export default router;
