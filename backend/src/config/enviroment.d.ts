declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_ORIGIN: string,
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			MONGODB_URI:string
		}
	}
}
export {}