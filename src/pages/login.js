import React from "react";

import Message from "../components/message";
import Form from "../components/form";

//required type className placeholder onChange wraper={div}

let formElements = [
	{type:"text",required:true,name:"User name",placeholder:"Rafael Contreras",className:"m-2 form-control",arg:["name"]},

	{type:"text",required:true,name:"Email",placeholder:"rafael@contreras.com",className:"m-2 form-control",arg:["email"]},

	{type:"password",required:true,name:"Password",className:"m-2 form-control",arg:["password"]},

	{type:"submit",name:"Submit",className:"btn btn-primary"}
]

const messageData = [
{
	title:"Invalid user",
	content:"The user name, email or password is incorrect",
	titleStyle:"dark",
	contentStyle:"d",
	customColor:"#1af",
	active:false
},
{
	title:"d",
	content:"d",
	titleStyle:"danger",
	contentStyle:"warning",
	active:false
},
]

const setErrorMessage = (error)=>{
	let {context,message} = error;
	return {
		title:"Invalid "+context.label,
		content:message,
		titleStyle:"danger",
		contentStyle:"warning",
		active:true
	};
}

const Login = (props)=>{
	const [user,changeValue] = React.useState({});
	const [messageState,setMessages] = React.useState(messageData)
	
	const setValue = (key,e)=>{
		user[key] = e.target.value;
		changeValue(user);
	}

	const handleSubmit=async (e)=>{
		const value = await props.login(user);

		if (value.error)
			messageState[1] = setErrorMessage(value.error);
		else if (value.message==="NO_EXIST")
			messageState[0].active = true;
		else 
			props.history.push("/home")
		
		setMessages([...messageState]);
	}

	React.useEffect(()=>{
		formElements = formElements.map((el)=>{
			if (el.type==="submit") 
				el.onClick=handleSubmit.bind(this);
			else 
				el.onChange=setValue.bind(this);
			return el;
		})
	},[])

	return(
		<div className="container col-9">

			<Message values={messageState}/>
			
			<h1 className="display-4">Login</h1>
			<Form values={formElements}/>
		</div>	
	);
}

export default Login;