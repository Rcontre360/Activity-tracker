const {Router} = require("express");

const router = Router();

const {registerValidation, loginValidation} = require("../helpers/validators");
const {getUser,sqlConnection,insertUser} = require("../helpers/dbHelpers");
const {encrypt,compare} = require("../helpers/encryptors");

router.post("/register",async (req,res)=>{

	const {name,email,password,initDate} = req.body;
	const {value,error} = registerValidation.validate(req.body);
	
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Credentials', true);

	if (error){
		res.json({error:error.details[0]});
		return;
	}

	response = await getUser(sqlConnection,req.body)

	if (response!=="NO_EXIST"){
		res.json(response)
		return;
	}

	const insert = await insertUser(sqlConnection,{
		name:name,
		email:email,
		password:await encrypt(password),
		initDate:initDate
	});

	req.session.userID = insert.insertId;

	res.send({message:"NO_EXIST"})

});

router.post("/login",async (req,res)=>{
	const {name,email,password} = req.body;
	const {value,error} = loginValidation.validate(req.body);

	if (error){
		res.json({error:error.details[0]});
		return;
	}

	const response = await getUser(sqlConnection,req.body)
	
	if (response==="NO_EXIST")
		return res.send({message:response});

	const isCorrectPassword = await compare(password,response.password);

	if (response.name===name && response.email===email && isCorrectPassword){
		req.session.userID = response.ID;
		console.log(req.session)
		return res.json({name,email});
	}

	res.send({message:"NO_EXIST"});
});

router.post("/logout",(req,res)=>{
	console.log(req.body)
	req.session.destroy(()=>{
		res.clearCookie("cookie-name")
		res.send({message:"done"})
	});
});

module.exports = router;