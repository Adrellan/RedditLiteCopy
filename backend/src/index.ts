import express, { Express, Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import {CorsConfig} from "./config/cors.config";
import {db} from "./config/db.config";
import {performanceMiddleware} from "./middlewares/performace.mw";
import { authenticationMiddleware } from './middlewares/authentication.mw';
import apiRouter from "./api.router";
import compression from "compression"
import {logger} from "./config/logger.config";

const settings = require('../package.json');
const cookieParser = require('cookie-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
logger.init()

// --- Init Database --- //
db.init().catch(e=>{
	console.error(`Unable to connect to the database: ${e}`)
});

// --- Middlewares --- //
app.use(cookieParser());
/// Parsing body to JSON
app.use(express.json())

/// CORS policy
app.use(cors(CorsConfig));

/// Performance
app.use(performanceMiddleware);

/// Authentication
//app.use("/api/logout", authenticationMiddleware);

/// Response compression for optimal
app.use(compression());

//Auth middleware goes here!



// Main router for /api prefix!
app.use("/api", apiRouter)
//KRISTÓFÉ
app.use("/", (req,res)=>res.send(settings.version))

console.log(CorsConfig);

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
// 	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// 	next();
//   })

app.listen(port, () => {
	console.log('Környezeti változók:', process.env);
	console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});

