import mongoose from "mongoose";
class dbConnection {
	dbUrl: string;
	constructor(dbUrl: string) {
		this.dbUrl = dbUrl;
		mongoose
			.connect(dbUrl)
			.then(() => {
				console.log("Database connection is successfull...");
			})
			.catch(() => {
				console.log("Database connection is not established !");
			});
	}
}
export default dbConnection;
