import * as mongoose from "mongoose";

class UserModel {
	userModel: any;
	constructor() {
		const userSchema = new mongoose.Schema({
			email: { type: String, required: true, trim: true },
			password: { type: String, required: true, trim: true },
		});
		this.userModel = mongoose.model("users", userSchema);
	}
}
export default UserModel;
