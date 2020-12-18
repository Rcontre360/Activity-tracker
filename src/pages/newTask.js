import React from "react";
import {Link} from "react-router-dom";
import Message from "../components/message";

const NewTask = (props)=>{

	const [task,changeValue] = React.useState({});
	const [showMessage,setMessageState] = React.useState(false);

	const messageState = {
		title:"Invalid task",
		content:"You need to give a name to your task",
		titleStyle:"danger",
		contentStyle:"warning"
	}

	const setValue = (key,e)=>{
		task[key] = e.target.value;
		changeValue(task);
	}

	const handleSubmit=()=>{
		if (task["name"]==="" || task["name"]==undefined){
			setMessageState(true);
			return;
		}
		props.history.push("/tasks")
		props.addNewTask(task);
	}

	const closeMessage=()=>{
		setMessageState(false);
	}

	return(

		<div className="container">

			{showMessage && <Message {...messageState} 
							closeMessage={closeMessage.bind(this)}/>}

			<h1 className="display-4">Create a new task</h1>
			<form className="form-group">

				<label htmlFor="taskName">Task Name</label>
				<input required type="text" className="mb-4 form-control"
				placeholder="Your task name" id="taskName"
				maxLength ="20" onChange={(e)=>setValue("name",e)}/>

				<label htmlFor="taskDescription">Task Description</label>
				<textarea className="mb-4 form-control" type="form-control" 
				id="taskDescription" placeholder="Your description"
				maxLength ="200" onChange={(e)=>setValue("description",e)}>
				</textarea>
				
				<div className="mb-4">
	    			<label htmlFor="taskImage"className="mr-4">
	    				Task Image
	    			</label>
	    			<input type="file" className="form-control-file btn col-6" 
	    			id="taskImage" placeholder="set your task image"
	    			onChange={(e)=>setValue("file",e)}/>
	    		</div>

				<div className="form-group form-check">
    				<input type="checkbox" 
    				className="form-check-input" id="exampleCheck1"
    				onChange={(e)=>setValue("simultaneous",e)}/>
    				<label className="form-check-label" 
    				htmlFor="exampleCheck1">Set as no simultaneous activity</label>
  				</div>

  				<button type="button" className="btn btn-primary"
  				onClick={handleSubmit}>
  					Submit new Task
  				</button>

			</form>
		</div>
	);
}

export default NewTask;