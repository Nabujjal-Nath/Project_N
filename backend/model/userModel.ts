import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, trim: true },
	password: { type: String, required: true, trim: true },
});
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
