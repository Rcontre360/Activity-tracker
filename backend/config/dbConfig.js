const MYSQL_CONFIG = {
	host : 'localhost',
	user : 'root',
	password: 'r8112965',
	database:"activity_tracker"
}
	
const mainPath = __dirname+"/../../SQL-tables";

const FILE_PATHS = [
	mainPath+"/users.sql",
	mainPath+"/tasks.sql",
	mainPath+"/intervals.sql"
]

module.exports = {MYSQL_CONFIG,FILE_PATHS};