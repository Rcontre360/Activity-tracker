const {Router} = require("express");
const router = Router();

const {taskValidation} = require("../helpers/validators");
const {insertTask,sqlConnection} = require("../helpers/dbHelpers");

router.post("/create",async (req,res)=>{

	const {error,response} = await taskValidation.validate(req.body);


	if (error){
		res.json({error:error.details[0]});
		return;
	}

	const final = await insertTask(sqlConnection,{...req.body,userID:req.session.userID})
	console.log(final)


	res.send({message:"OK"})

})

module.exports = router;