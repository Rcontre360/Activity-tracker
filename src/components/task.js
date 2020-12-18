import React from "react";
import TimeClock from "./clock";

import {TaskContext} from "./taskManager";

const Task = (props)=>{
	const {startTime,
		  deleteTask,
		  stopTime,
		  resetTime} = React.useContext(TaskContext);
	const task = props.task;

	return(
	<div className="card m-3" >
		<div className="row no-gutters">
			<div className="col-4" id="taskImageContainer">
				<img src="./assets/ruños.jpg" 
				className="card-img" 
				alt="mis ruños jaja"
				id="taskImage"/>
	  		</div>
	  		<div className="col-8">
		  		<div className="card-body pb-0">
		    		<h5 className="card-title">{task.name}</h5>
		    		<p className="">
		    			{task.description}
		    		</p>
		    		<div className="card-footer p-2 d-flex justify-content-between">
			    		<button className="btn btn-danger ml-2 mr-2"
			    		onClick={deleteTask.bind(this,task.id)}>
			    			Erase
			    		</button>
			    		<button className="btn btn-success ml-2 mr-2"
				    		onClick={()=>{
				    				if (!task.running)
				    					startTime(task.id);
						    	 	else 
						    			stopTime(task.id);
			    				}
							}
			    		>
			    		Run
			    		<TimeClock time={task.currentTime}/>
			    		</button>
			    		<button className="btn btn-warning mr-2"
			    				onClick={resetTime.bind(this,task.id)}
			    			>Reset
			    		</button>
			    		<button className="btn btn-primary ml-2 mr-2">Check activity</button>
		  			</div>
		  		</div>
		  	</div>
		</div>
	</div>
	);
}

export default Task;