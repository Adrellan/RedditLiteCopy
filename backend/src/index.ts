import express, { Express, Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import {CorsConfig} from "./config/cors.config";
import {db} from "./config/db.config";
import {performanceMiddleware} from "./middlewares/performace.mw";
import apiRouter from "./api.router";
import compression from "compression"
import {logger} from "./config/logger.config";
const settings = require('../package.json');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
logger.init()

// --- Init Database --- //
db.init().catch(e=>{
	console.error(`Unable to connect to the database: ${e}`)
});

// --- Middlewares --- //

/// Parsing body to JSON
app.use(express.json())

/// CORS policy
app.use(cors(CorsConfig));

/// Performance
app.use(performanceMiddleware);

/// Response compression for optimal
app.use(compression());

//Auth middleware goes here!



// Main router for /api prefix!
app.use("/api", apiRouter)
app.use("/", (req,res)=>res.send(settings.version))

app.listen(port, () => {
	console.log('Környezeti változók:', process.env);
	console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});