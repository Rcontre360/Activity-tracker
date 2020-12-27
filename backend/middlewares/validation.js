const bcrypt = require("bcryptjs");
const {body,validationResult} = require("express-validator");


functions.validations = {
	email:body("email").
		isEmail()
		.normalizeEmail(),
	password:body("password").
		not().isEmpty()
		.trim().escape(),
	name:body("name").not().isEmpty()
		.trim().escape(),
	validationResult 
}