import mongoose from "mongoose"


export const db = {
	init: async () => {
		console.log(`💡 Trying to connect to MongoDB: (${process.env.MONGODB_URI}) ...`)
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("✅  Database initialized successfully!")
	}
}