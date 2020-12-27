
const fs = require("fs");

const getFileString = (path)=>{
	return new Promise((resolve,reject)=>{ 
		fs.readFile(path, (err,data)=>{
			if (err) {
				console.log(ERR_MESSAGE+"READING FILES",err)
				reject(null);
			} else {
				resolve(data.toString());
			}
		})
	});
}

module.exports = {getFileString};