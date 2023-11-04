//TODO: Daniella ezek rád várnak ;)

import {Router} from "express";
const router = Router();


router.post("/login", (req, res)=>{
	const {username, password} = req.body;
	//TODO: ND -> Implement the login method: Response should contain a cookie that contains the JWT token itself.
})


router.post("/register", (req,res)=>{
	//TODO: ND -> Implement a register method
})

router.get("/user/:id", (req,res)=>{
	//TODO: Implement a method that gets the user by it's ID!
})

export default router;