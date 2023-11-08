import { Router } from "express";
//import { IComment, Comment } from "../models/comment.model";
import { setNewRecordInfo } from "../helpers/record.helper";
import { badRequest, Ok } from "../helpers/response.helper";

const router = Router();

router.get("", async (req, res) => {
  // TODO: Implementáld, hogy minden AKTÍV kommentet lekérj a MongoDB-ből
  try {
    console.log("uhu");
  //  const comments = await Comment.findActives();
    //Ok(res, comments);
  } catch (e) {
    badRequest(res, e);
  }
});

router.get("/:commentId", async (req, res) => {
  // TODO: Kérj le egy részletes verziót a kommentről az azonosítója alapján
  const { commentId } = req.params;

  try {
    //const comment = await Comment.findById(commentId);

   // Ok(res, comment);
  } catch (e) {
    badRequest(res, e);
  }
});

router.post("", async (req, res) => {
  // TODO: Implementáld egy új komment létrehozását, és állítsd be az írót az aktuális felhasználó elvének!
  try {
    /*const comment = req.body as IComment;

    // Állítsd be a rekord metaadatait
    setNewRecordInfo(comment);

    const newComment = new Comment({ ...comment });
    await newComment.save();

    Ok(res, newComment);*/
  } catch (e) {
    badRequest(res, e);
  }
});

router.put("/:commentId", async (req, res) => {
  // TODO: Implementáld a megfelelő komment módosítását
  try {
   /* const { commentId } = req.params;
    const modifiedComment = req.body as IComment;

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { ...modifiedComment, updated: new Date() },
      { returnDocument: "after" }
    );

    Ok(res, updatedComment);*/
  } catch (e) {
    badRequest(res, e);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
   /* const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (comment == null) {
      badRequest(res, new Error(`Nem található komment azonosítóval: ${commentId}`));
      return;
    }

    comment.active = false;
    await comment.save();
    Ok(res, comment);*/
  } catch (e) {
    badRequest(res, e);
  }
});

export default router;
