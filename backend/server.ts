import * as dotenv from "dotenv";
dotenv.config(); // configure dotenv to access environment variables from .env file
import * as express from "express";
const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server is up at port ${process.env.PORT}`);
});
