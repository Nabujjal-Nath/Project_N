import UserModel from "../model/userModel";
import { body } from "express-validator";
import * as bcrypt from "bcrypt";

class UserContoller {
	userModel: UserModel = new UserModel();

	constructor() {}
	userRegistration = async (req: any, res: any) => {
		const { email, password, confirmPassword } = req.body;
		if (password != confirmPassword)
			return res.status(401).json({ errorMessage: "Inavalid username or password!" });
		//validate email
		if (!body(email).isEmail())
			return res.status(401).json({ errorMessage: "Inavalid username or password!" });
		//check whether email is already present in database
		const user = await this.userModel.userModel.findOne({ email: email });
		if (user) return res.status(409).json({ errorMessage: "Email already exists!" });
		//salt the password and store it as encrypted passcode in database
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			const document = await new this.userModel.userModel({
				email: email,
				password: hashPassword,
			});
			await document.save();
			return res.status(201).json({ successMessage: "Registration successfull!!" });
		} catch {
			() => {
				return res.status(401).json({ errorMessage: "Inavalid username or password!" });
			};
		}
	};
}

export default UserContoller;
