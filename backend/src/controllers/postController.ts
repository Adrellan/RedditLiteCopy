

import {Router} from "express"

const router = Router();



router.get("", (req, res)=>{
	res.status(200).send("Sok poszt van itten")
})



export default router;



