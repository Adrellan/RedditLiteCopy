import chalk from "chalk"




export const logger = {
	init: ()=>{
		console.error = (...params)=>{
			console.info("❌  ",chalk.red.bold(...params))
		}
		console.log = (...params)=>{
			console.info((chalk.blueBright.italic(...params)))
		}
		console.warn = (...params)=>{
			console.info(chalk.yellow.bold("⚠",...params))
		}
	}
}