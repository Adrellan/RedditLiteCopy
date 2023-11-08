//TODO: Daniella ezek rád várnak ;)
import { Router } from "express";
import { IUser, User } from "../models/user.model";
import crypto from "crypto";
import {setNewRecordInfo} from "../helpers/record.helper";
import {badRequest, Ok} from "../helpers/response.helper";

const router = Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY

router.post("/login", (req, res)=>{
	const {username, password} = req.body;

	User.findOne({ userName: username }, (err: Error, user: any) => {
	  if (err || !user) {
		return res.status(401).json({ error: 'Érvénytelen felhasználónév vagy jelszó' });
	  }
	  setNewRecordInfo(user);
	  if (!verifyPassword(password, user.password, user.salt)) {
		return res.status(401).json({ error: 'Érvénytelen felhasználónév vagy jelszó' });
	  }
	  
	  const token = jwt.sign({ username }, secretKey);
	  res.cookie('auth_token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 });
	  
	  res.status(200).json({ message: 'Bejelentkezés sikeres' });
	});
	//TODO: ND -> Implement the login method: Response should contain a cookie that contains the JWT token itself.
})


router.post("/register", async (req,res)=>{
	//TODO: ND -> Implement a register method -> use crypto lib to hash the password!!
	try {
		//const { fullName, userName, password, email } = req.body;
		const user = req.body as IUser
		const salt = generateSalt();
		
		const hashedPassword = hashPassword(user.password, salt);
		
		setNewRecordInfo(user);
		const newUser = new User({
			user
		});
		
		await newUser.save();
	
		res.status(201).json({ message: 'Regisztráció sikeres' });
	  } catch (e) {
		res.status(400).json({ error: 'Sikertelen regisztráció' });
	  }
	
})

router.get("/user/:id", async (req,res) => {
	//TODO: Implement a method that gets the user by it's ID!
	const {id} = req.params

	try {
		const post = await User.findById(id);

		Ok(res, post);

	} catch (e) {
		badRequest(res, e);
	}
})

export default router;

function generateSalt() {
	return crypto.randomBytes(16).toString('hex');
  }
  
function hashPassword(password: string, salt: any) {
	return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}
  
function verifyPassword(password: string, hashedPassword: string, salt: any) {
	return hashedPassword === hashPassword(password, salt);
}