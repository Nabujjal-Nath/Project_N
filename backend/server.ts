import * as dotenv from "dotenv";
import * as cors from "cors";
dotenv.config(); // configure dotenv to access environment variables from .env file
import * as express from "express";
import DBConnection from "./config/dbconfig";
import Route from "./routes/Route";
const app = express();
app.use(cors());
new DBConnection(
	`mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.q3a5vxv.mongodb.net/dbase`
);

//JSON
app.use(express.json());

//Register routes
app.use(Route);

app.listen(process.env.PORT, () => {
	console.log(`Server is up at port ${process.env.PORT}`);
});
