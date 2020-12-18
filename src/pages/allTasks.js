import React from "react";
import {Link} from "react-router-dom";
import Task from "../components/tasks/task";

const AllTask = (props)=>{
	const {taskarray,taskmap} = props;

	return(
		<div className="mx-auto col-8">
			{taskarray.length<=0?
				<div className="jumbotron text-center p-4">
					<h1 className="display-4">You have no tasks</h1>
					<p className="lead">Add new activities to track your productivity!</p>
					<Link to="/newTask" className="btn btn-primary mt-3">Add New Task</Link>
				</div>
				:
				taskarray.map((task,id)=>{
					return <Task key={id} task={{...task,...taskmap.get(task.id)}}/>
				})}
		</div>
	);
}

export default AllTask;