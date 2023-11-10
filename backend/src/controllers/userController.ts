import { Router } from "express";
import { IUser, User } from "../models/user.model";
import crypto from "crypto";
import {setNewRecordInfo} from "../helpers/record.helper";
import {badRequest, Ok} from "../helpers/response.helper";

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

		const token = jwt.sign({ userName }, secretKey);
		
		const [header, payload, signature] = token.split('.');
		res.cookie('auth_token', `${header}.${payload}`, { httpOnly: true});
		res.cookie('auth_signature', signature, { httpOnly: true });

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
		
		await newUser.save();

		sendConfirmationEmail(user.email);
	
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

router.get("/logout", (req, res) => {
	res.clearCookie("auth_token");
  
	res.status(200).json({ message: 'Logout successful.' });
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

function sendConfirmationEmail(email: String) {
	const transporter = nodemailer.createTransport({
	  service: 'Gmail', 
	  auth: {
		user: 'redditlitecopy@gmail.com',
		pass: 'tllf rtdo iidi hjls'
	  }
	});
  
	const mailOptions = {
	  from: 'redditlitecopy@gmail.com',
	  to: email,
	  subject: 'Regisztráció megerősítése',
	  text: 'Kérjük, kattintson az alábbi linkre a regisztráció megerősítéséhez: http://localhost:3560/api/'
	};
  
	transporter.sendMail(mailOptions, (error: Error, info: any) => {
	  if (error) {
		console.log('An error occurred while sending the email: ' + error);
	  } else {
		console.log('Confirmation email sent: ' + info.response);
	  }
	});
  }