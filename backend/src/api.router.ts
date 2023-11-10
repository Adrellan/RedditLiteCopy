

import {Router} from "express"
import postController from "./controllers/postController";
import userController from "./controllers/userController";
import commentController from "./controllers/commentController"


const router = Router();


// --- Register all the controllers here --- //
router.use("/post", postController)
router.use("/", userController)
router.use("/comment", commentController)

export default router;