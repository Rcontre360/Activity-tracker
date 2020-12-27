import React from "react";

import Message from "../components/message";
import Form from "../components/form";

//required type className placeholder onChange wraper={div}

let formElements = [
	{type:"text",required:true,name:"User name",placeholder:"Rafael Contreras",className:"m-2 form-control",arg:["name"]},

	{type:"text",required:true,name:"Email",placeholder:"rafael@contreras.com",className:"m-2 form-control",arg:["email"]},

	{type:"password",required:true,name:"Password",className:"m-2 form-control",arg:["password"]},

	{type:"password",required:true,name:"Confirm password",className:"m-2 form-control",arg:["confirmPassword"]},

	{type:"submit",name:"Submit",className:"btn btn-primary"}
]

const messageData = [{
	title:"Invalid name",
	content:"This username has already been taken",
	titleStyle:"dark",
	contentStyle:"d",
	customColor:"#1af",
	active:false
},
{
	title:"Invalid email",
	content:"This email is already registered",
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
	if (context.label==="confirmPassword"){
		context.label = "Password confirmation" 
		message = "The password confirmation is required"
	}
	return {
		title:"Invalid "+context.label,
		content:message,
		titleStyle:"danger",
		contentStyle:"warning",
		active:true
	};
}

const Registration = (props)=>{
	const [user,changeValue] = React.useState({});
	const [messageState,setMessages] = React.useState(messageData)
	
	const setValue = (key,e)=>{
		user[key] = e.target.value;
		changeValue(user);
	}

	const handleSubmit=async (e)=>{
		user.initDate = new Date(Date.now()).toUTCString();
		const value = await props.createUser(user);

		if (value.message==="NO_EXIST"){
			props.history.push("/home")
			return;
		}

		if (value.name===user.name && value.name)
			messageState[0].active = true;

		if (value.email===user.email && value.email)
			messageState[1].active = true;

		if (value.error)
			messageState[2] = setErrorMessage(value.error);
		
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
			
							
			<h1 className="display-4">Registration</h1>
			<Form values={formElements}/>
		</div>	
	);
}

export default Registration;