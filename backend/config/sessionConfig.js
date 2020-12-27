
process.env.COOKIE_TIMEOUT = 1000*60*5;

const SESSION_CONFIG ={
	secret:"your-secret", //to avoid modifications to the cookie (security)
	name:"cookie-name",
	resave:false, //doenst save session in store unless session changes
	saveUninitialize:false, //true=save "unmodified" sessions
	cookie:{
		maxAge:1000*60*5,
		sameSite:true, //"strict"
		secure:process.env.NODE_ENV==="production"
	}
}

module.exports = SESSION_CONFIG;