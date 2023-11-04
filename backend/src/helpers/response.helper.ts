import {Response} from "express";


export const badRequest = (res: Response, ...params:any[])=>{
	res.status(500).send(...params);
}
export const Ok = (res: Response, ...params:any[])=>{
	res.status(200).send(...params);
}

export const ClientError =  (res: Response, ...params:any[])=>{
	res.status(400).send(...params);
}

export const Unauthorized =  (res: Response, ...params:any[])=>{
	res.status(401).send(...params);
}

export const Forbidden =  (res: Response, ...params:any[])=>{
	res.status(403).send(...params);
}