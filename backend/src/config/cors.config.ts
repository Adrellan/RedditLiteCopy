import cors from "cors"

export const CorsConfig : cors.CorsOptions  = {
	origin: ['http://localhost:4200', 'http://localhost:8080', 'https://rlc-client-8ade8b2d7c42.herokuapp.com/'],
	credentials: true
}

