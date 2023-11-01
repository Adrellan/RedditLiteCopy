

import {Router} from "express"
import postController from "./controllers/postController";


const router = Router();


// --- Register all the controllers here --- //
router.use("/post", postController)


export default router;