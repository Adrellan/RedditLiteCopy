import {Router} from "express"

const Comment = require('./models/comment.model');

const express = require('express');
const router = express.Router();



router.get("", (req: any, res: any)=>{
	//TODO: Implement to get all the ACTIVE comment from the MongoDB
	res.status(200).send("Comments")
})

router.get("/:postid", (req: any, res: any)=>{
	const postId = req.params.postid; // A poszt azonosítója a kérés URL-jéből

    Comment.find({ post: postId }, (err: any, comments: any) => {
        if (err) {
        return res.status(500).json({ message: "Hiba a kommentek lekérése közben." });
        }

        // Sikeres lekérdezés esetén visszaküldjük a poszthoz tartozó kommenteket
        res.status(200).json(comments);
    });
})

router.post("/", (req: any, res: any)=>{
	if (!req.user) {
        return res.status(401).json({ message: "Nincs bejelentkezve felhasználó." });
      }
    
      const userId = req.user.id;
    
      const newComment = {
        text: req.body.text, // Vagy más adat, amit a kliens küld
        author: userId, // Beállítjuk az aktuális felhasználó azonosítóját
      };
    
      // TODO: A newComment mentése a MongoDB adatbázisba vagy a megfelelő tárolóba
    
      // Válasz küldése
      res.status(201).json(newComment);
})

router.put("/:commentId", (req: any, res: any)=>{
	//TODO: Implement a modification for the according comment
})

router.delete("/:commentId", (req: any, res: any)=>{
	//TODO: Implement a logical DELETE for the comment.
})


module.exports = router;
