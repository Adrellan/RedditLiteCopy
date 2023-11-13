import { Router } from "express";
import { IUser, User } from "../models/user.model";
import crypto from "crypto";
import {setNewRecordInfo} from "../helpers/record.helper";
import {badRequest, Ok} from "../helpers/response.helper";
import { authenticationMiddleware } from '../middlewares/authentication.mw';


const router = Router();
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator')
const nodemailer = require("nodemailer");

require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY

router.post("/login", async (req, res)=>{
	const { userName, password } = req.body;

	try{
		const user = await User.findOne({ userName });
		if (!user){
			return res.status(401).json({error: 'Invalid username or password'})
		}
		const isPasswordValid = verifyPassword(password, user.password, user.salt);

		if (!isPasswordValid) {
		return res.status(401).json({ error: 'Invalid username or password' });
		}
		const fullName = user.fullName;

		const token = jwt.sign({ fullName, userName }, secretKey);
		
		const [header, payload, signature] = token.split('.');
		res.cookie('AUTH_TOKEN', `${header}.${payload}`, { httpOnly: false, secure: true, path:"/" });
		res.cookie('AUTH_SIGNATURE', signature, { httpOnly: false, secure: true, path:"/" });

		res.status(200).json({ message: 'Login successful' });
	}catch{
		res.status(500).json({ error: 'Login unsuccessful' });
	}
})

router.post("/register",[
	body("fullName").notEmpty().withMessage("The full name field cannot be empty."),
	body("userName").notEmpty().withMessage("The username cannot be empty.").custom(async (value: any) => {
		const existingUser = await User.findOne({ userName: value});
		if(existingUser){
			throw new Error("The username is taken.");
		}
		return true;
	}),
	body("email").isEmail().withMessage("The email is invalid.")
	.custom(async (value: any) => {
		const existingUser = await User.findOne({ email: value});
		if(existingUser){
			throw new Error("The email address is already registered.");
		}
		return true;
	}),
	body("password").isLength({min: 8}).withMessage("It must be at least 8 characters long")
], async (req: Request, res: any) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	try {
		const requestBody = req.body as unknown;
		const user = requestBody as IUser
		const salt = generateSalt();
		
		user.password = hashPassword(user.password, salt);
		user.salt = salt;
		setNewRecordInfo(user);
		const newUser = new User({...user});

		const userName = user.userName;
	
		await newUser.save();

	
		res.status(201).json({ message: 'Registration successful.' });
	  } catch (e) {
		res.status(400).json({ error: 'Registration unsuccessful' });
	  }
	
})

router.get("/user/:id", async (req,res) => {
	const {id} = req.params

	try {
		const post = await User.findById(id);

		Ok(res, post);

	} catch (e) {
		badRequest(res, e);
	}
})

router.get("/logout",authenticationMiddleware, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		console.log('Nincs hozzáférés.');
		res.status(401).json({error: "Nincs hozzáférés"});
	}
	else{
		res.clearCookie("AUTH_TOKEN");
		res.clearCookie("AUTH_SIGNATURE");
	
		console.log('Logout successful.');

		res.status(200).json({ message: 'Logout successful.' });
	}
	
  });

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