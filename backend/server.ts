import * as dotenv from "dotenv";
dotenv.config(); // configure dotenv to access environment variables from .env file
import * as express from "express";
import dbConnection from "./config/dbconfig";
const app = express();
new dbConnection(
	`mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.q3a5vxv.mongodb.net/test`
);
app.listen(process.env.PORT, () => {
	console.log(`Server is up at port ${process.env.PORT}`);
});
