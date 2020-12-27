const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const mysqlSession = require("express-mysql-session")(session);
const mysql = require("mysql")

const {MYSQL_CONFIG} = require("./config/dbConfig");
const SESSION_CONFIG = require("./config/sessionConfig");
const {setDatabase,setSQLTables} = require("./helpers/dbHelpers");
const routes = require("./routes");
require("./config/appConfig")

module.exports = ()=>{
	const app = express();
	app.use(cors({
		origin:"http://localhost:3000",
		credentials:true
	}));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(morgan("dev"));

	const connection = mysql.createConnection(MYSQL_CONFIG);
	const sessionStore = new mysqlSession({multipleStatements: true},connection);

	connection.connect(async (err,res)=>{
		if (err) 
			console.log("ERROR OCURRED WHEN CONNECTING DATABASE: ",err)
		/*else {
			await setDatabase(connection);
		}*/
	});
	
	SESSION_CONFIG.store = sessionStore;
	app.use(session(SESSION_CONFIG));

	app.use("/",routes);

	return app;
}