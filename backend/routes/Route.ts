import * as express from "express";
import UserContoller from "../controller/userController";
import AuthMiddleware from "../midlewares/authmiddleware";
const router = express.Router();
const userController = new UserContoller();
const authmiddleware = new AuthMiddleware();

//Middleware
router.use("/userDetails", authmiddleware.jwtAuth);

//Public Routes
router.post("/userRegister", userController.userRegistration);
router.post("/userLogin", userController.userLogin);

//Protected Routes
router.get("/userDetails", userController.userDetails);

export default router;
