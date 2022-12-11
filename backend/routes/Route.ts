import * as express from "express";
import UserContoller from "../controller/userController";
const router = express.Router();
const userController = new UserContoller();
router.post("/userRegister", userController.userRegistration);

export default router;
