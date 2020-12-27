import React from "react";
import {Link} from "react-router-dom";

import Message from "../components/message";
import Form from "../components/form";
//required type className placeholder onChange wraper={div}

let formElements = [
	{required:true,type:"text",className:"mb-4 form-control",
	placeholder:"Your task name",name:"Task name",arg:["name"]},

	{type:"textarea",className:"mb-4 form-control",
	placeholder:"Your description",name:"task description",arg:["description"]},

	{type:"file",
	className:"form-control-file btn col-6", 
	placeholder:"set your task image",name:"Task image",arg:["file"]},

	{type:"checkbox", className:"form-check-input",name:"Set as no simultaneous activity",label:{className:"form-check-label"},arg:["set"]},

	{wraper:{className:"col-6 text-center mx-auto m-4"},type:"submit",className:"btn btn-primary",name:"Submit new task"}
]


const messageValues = [{
	title:"Invalid task",
	content:"You need to give a name to your task",
	titleStyle:"danger",
	contentStyle:"warning"
}]

const NewTask = (props)=>{

	const [task,changeValue] = React.useState({});
	const [messageState,setMessageState]= React.useState(messageValues);

	const setValue = (key,e)=>{
		task[key] = e.target.value;
		changeValue(task);
	}

	const handleSubmit=()=>{
		if (task["name"]==="" || task["name"]==undefined){
			messageState[0].active=true;
			setMessageState([...messageState]);
			return;
		}
		props.history.push("/tasks")
		props.addNewTask(task);
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

		<div className="container">

			<Message values = {messageState}/>

			<h1 className="display-4">Create a new task</h1>
			<Form values={formElements}/>
		</div>
	);
}

export default NewTask;