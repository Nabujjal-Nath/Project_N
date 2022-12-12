import UserModel from "../model/userModel";
import { body } from "express-validator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
class UserContoller {
	constructor() {}

	//User registration business logic
	userRegistration = async (req: any, res: any) => {
		const { email, password, confirmPassword } = req.body;
		if (password != confirmPassword)
			return res.status(401).json({ errorMessage: "Inavalid username or password!" });
		//validate email
		if (!body(email).isEmail())
			return res.status(401).json({ errorMessage: "Inavalid username!" });
		//check whether email is already present in database
		const user = await UserModel.findOne({ email: email });
		if (user) return res.status(409).json({ errorMessage: "Email already exists!" });
		//salt the password and store it as encrypted passcode in database
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			const document = await new UserModel({
				email: email,
				password: hashPassword,
			});
			await document.save();
			const savedUser = await UserModel.findOne({ email: email });
			const token = jwt.sign({ user_id: savedUser._id }, process.env.jwtSecretKey, {
				expiresIn: "3d",
			});
			return res
				.status(201)
				.json({ successMessage: "Registration successfull!!", token: token });
		} catch {
			() => {
				return res.status(401).json({ errorMessage: "Inavalid username or password!" });
			};
		}
	};

	// User login business logic
	userLogin = async (req: any, res: any) => {
		const { email, password } = req.body;
		// Check whether email is present in database
		const user = await UserModel.findOne({ email: email });
		if (!user) return res.status(401).json({ errorMessage: "User is not registered!" });
		// Compare hashed password
		if (email && password) {
			if (await bcrypt.compare(password, user.password)) {
				const savedUser = await UserModel.findOne({ email: email });
				const token = jwt.sign({ user_id: savedUser._id }, process.env.jwtSecretKey, {
					expiresIn: "3d",
				});
				return res.status(200).json({ successMessage: "Login Success", token: token });
			}
			return res.status(401).json({ errorMessage: "Inavalid username or password!" });
		}
		return res.status(401).json({ errorMessage: "Inavalid username or password!" });
	};

	// Get user details business logic
	userDetails = (req: any, res: any) => {
		res.send(res.user);
	};
}

export default UserContoller;
