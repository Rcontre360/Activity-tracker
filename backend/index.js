
const app = require("./appInitServer")();

app.listen(process.env.PORT || 4000,()=>{
	console.log("listening at port 4000");
});