

import {Router} from "express"
import postController from "./controllers/postController";
import userController from "./controllers/userController";


const router = Router();


// --- Register all the controllers here --- //
router.use("/post", postController)
router.use("/", userController)


export default router;