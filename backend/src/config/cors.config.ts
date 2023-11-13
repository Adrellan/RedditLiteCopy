import cors from "cors"

export const CorsConfig : cors.CorsOptions  = {
	origin: 'http://localhost:4200',
	credentials: true
}

