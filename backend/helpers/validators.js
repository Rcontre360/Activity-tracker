const Joi = require("@hapi/joi");

const email = Joi.string().email().min(8).max(100).lowercase().trim().required();

const name = Joi.string().min(3).max(20).lowercase().trim().required();

const password = Joi.string().min(8).max(50).required();

const confirmPassword = Joi.valid(Joi.ref("password")).required();

const initDate = Joi.string().lowercase().trim().required();

const description = Joi.string().lowercase().trim();

const registerValidation = Joi.object({
	name,email,password,confirmPassword,initDate
});

const loginValidation = Joi.object({
	name,email,password
})

const taskValidation = Joi.object({
	name,description
})

module.exports = {registerValidation,loginValidation,taskValidation};