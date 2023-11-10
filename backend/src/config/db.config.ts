import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
const mongodbUri: string = process.env.MONGODB_URI || '';

export const db = {
	init: async () => {
		console.log(`💡 Trying to connect to MongoDB: (${mongodbUri}) ...`)
		await mongoose.connect(mongodbUri)
		console.log("✅  Database initialized successfully!")
	}
}