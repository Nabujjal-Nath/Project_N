import * as jwt from "jsonwebtoken";
import UserModel from "../model/userModel";
interface JwtPayload {
	user_id: string; // We have used "user_id" while creating token in /userLogin
}

class AuthMiddleware {
	constructor() {}
	jwtAuth = async (req: any, res: any, next: any) => {
		const { authorization } = req.headers;
		let token;
		if (authorization && authorization.startsWith("Bearer")) {
			try {
				token = authorization.split(" ")[1];
				// We have used "user_id" while creating token in /userLogin
				const { user_id } = jwt.verify(
					token,
					process.env.jwtSecretKey
				) as unknown as JwtPayload; //on success it return the payload ie. user_id in our case
				//Get user details using user_id
				res.user = await UserModel.findOne({ _id: user_id }).select("-password");
				next(); //passes the userdata stored in req.user to next function ie. /userDetails endpoint
			} catch (error) {
				console.log(error);
				res.status(401).send({ errormessage: "Unauthorized user" });
			}
		} else {
			res.sendStatus(401).json({ errorMessage: "Unauthorized user" });
		}
		if (!token) {
			res.sendStatus(401).json({ errorMessage: "Unauthorized user" });
		}
	};
}
export default AuthMiddleware;
