const {genSalt,hash,compare} = require("bcryptjs");

const encrypt = async (str) => {
	const salt = await genSalt(11);
	return await hash(str,salt);
}

module.exports = {encrypt,compare};