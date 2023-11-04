import cors from "cors"


export const CorsConfig : cors.CorsOptions  = {
	allowedHeaders : "*",
	methods: "*",
	origin: process.env.CLIENT_ORIGIN
}

