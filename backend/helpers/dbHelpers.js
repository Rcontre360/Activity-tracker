
const {MYSQL_CONFIG} = require("../config/dbConfig");
const {FILE_PATHS} = require("../config/dbConfig");

const {getFileString} = require("./fileSystem");
const mysql = require("mysql")


const sqlConnection = mysql.createConnection(MYSQL_CONFIG);
const ERR_MESSAGE = "THERE WAS AN ERROR WHEN ";

const connectToDatabase = async (connection)=>{
	await connection.query("USE activity_tracker",async (err,res)=>{
		if (err) 
			console.log(ERR_MESSAGE+"CONNECTING TO DATABASE",err);
		else {
			console.log("DATABASE CONNECTED");
			//await setSQLTables(FILE_PATHS,connection)
		}
	});
}

const createDatabase = async (connection)=>{
	await connection.query("CREATE DATABASE activity_tracker",async (err,res)=>{
		if (err) 
			console.log(ERR_MESSAGE+"CREATING DATABASE","b");
		else {
			console.log("DATABASE CREATED")
			await connectToDatabase(connection);
		}
	});
}

const setDatabase = async (connection)=>{

	await connection.query("SHOW DATABASES",async (err,res)=>{
		if (err) 
			console.log(ERR_MESSAGE+"SETTING DATABASE","a");
		else{
			
			if (res.find((db)=>db.Database==="activity_tracker"))
				await connectToDatabase(connection);
			else 
				await createDatabase(connection);
		} 
	});

}

const setSQLTables =async (paths,connection)=>{

	let tables = "";
	for (var k in paths){

		const table = await getFileString(paths[k]);
		if (table) tables+=table;

	}

	console.log("TABLES: ",tables)
	await connection.query(tables,async (err,res)=>{
		if (err)
			await console.log("ERROR SETTING TABLE "+err.sqlMessage);
		else 
			await console.log("success at setting tables")
	})
}

const getUser = (connection,user)=>{
	return new Promise((resolve,reject)=>{
		connection.query("SELECT * FROM users WHERE name=\""+user.name+"\" OR email=\""+user.email+"\";",(err,res)=>{

			if (err){
				console.log("there was an error",err);
				reject(err)
			} else {
				if (res.length==0)
					resolve("NO_EXIST")
				else 
					resolve(res[0])
			}
		});
	});
}

const insertUser = (connection,user)=>{
	return new Promise((resolve,reject)=>{
		connection.query("INSERT INTO users SET ?",user,(err,res)=>{

			if (err){
				console.log("there was an error",err);
				reject(err)
			} else {
				resolve(res);
			}
		});
	});
}

const insertTask = (connection,task)=>{
	return new Promise((resolve,reject)=>{
		connection.query("INSERT INTO tasks SET ?",task,(err,res)=>{

			if (err){
				console.log("there was an error ",err);
				reject(err);
			} else {
				console.log("taks added ",res);
				resolve(res);
			}

		})
	})
}


module.exports = {
	setDatabase,
	setSQLTables,
	getUser,
	sqlConnection,
	insertUser,
	insertTask
};