
import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticacteUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentsController()

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin ,createTagController.handle)
router.post("/login", authenticacteUserController.handle)
router.post("/compliments", createComplimentController.handle)

export { router };