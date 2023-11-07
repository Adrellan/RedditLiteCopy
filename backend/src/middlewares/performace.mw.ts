import {NextFunction, Request, Response} from 'express';
import chalk from "chalk"


export const performanceMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const startTime = new Date();
	console.log(chalk.yellow.bold(`${req.method} ${req.url}`))
	console.log(`🕒  API request started: ${new Date().toLocaleString()}`)
	await next();
	const endTime = new Date();
	console.log(`🕒  API request ended: ${new Date().toLocaleString()}`)
	console.log(`Performance: ${endTime.getTime() - startTime.getTime()}ms\n`)
}