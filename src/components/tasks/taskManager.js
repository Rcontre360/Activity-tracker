import React from "react";
import {Switch,Route} from "react-router-dom";

import axios from "axios";
axios.defaults.withCredentials = true;

import AllTasks from "../../pages/allTasks";
import NewTask from "../../pages/newTask";

const TaskContext = React.createContext();

class TaskManager extends React.Component{

	state={
		tasksData:this.props.tasksData,
		userTasksArray:this.props.userTasksArray,
		numTasks:this.props.numTasks
	}

	customSetState(newState){
		this.setState(newState);
		this.props.setNewState(newState)
	}

	async addNewTask(newTask){

		const res = await axios({
			method:"post",
			url:"http://localhost:4000/task/create",
			data:newTask
		});
		console.log(res)

		/*
		let newState = this.state;
		newTask["id"] = newState.numTasks++;

		newState.tasksData.set(newTask["id"],{
			"data":[],
			"running":false,
			"currentTime":0,
			"startTime":undefined,
			"intervals":0,
			"timerFunction":undefined
		});
		newState.userTasksArray.push(newTask);

		this.customSetState(newState);
		console.log(newTask)*/
	}

	deleteTask(id){
		let newState = this.state;
		newState.numTasks--;
		newState.userTasksArray = newState.userTasksArray.filter((task)=>task["id"]!==id);
		
		newState.tasksData.delete(id);
		this.customSetState(newState);
	}

	startTime(id){
		let {tasksData} = this.state;
		tasksData.get(id)["data"].push(
			{start:Date.now(),end:undefined}
		);
	    tasksData.get(id)["running"] = true;
		tasksData.get(id)["startTime"] = Date.now()-tasksData.get(id)["currentTime"];
		tasksData.get(id)["intervals"]++;

		tasksData.get(id)["timerFunction"] = setInterval(()=>{
			tasksData.get(id)["currentTime"] = Date.now()-tasksData.get(id)["startTime"];
			this.customSetState({tasksData});
		})
	}

	stopTime(id){
		let {tasksData} = this.state;
		clearInterval(tasksData.get(id)["timerFunction"]);
		tasksData.get(id)["running"] = false;

		const i = tasksData.get(id)["intervals"]-1;
		tasksData.get(id)["data"][i].end = Date.now();
		this.customSetState({tasksData});
	}

	resetTime(id){
		let {tasksData} = this.state;
		this.stopTime(id);
		
		tasksData.get(id)["currentTime"] = 0;
		tasksData.get(id)["startTime"] = Date.now();
		this.customSetState({tasksData});
	}

	render(){
		return (
		<Switch>
			<Route path="/newTask" render={(p)=>(
				<React.Fragment>
					<br className="m-4"/>
					<NewTask {...p} addNewTask={this.addNewTask.bind(this)}/>
				</React.Fragment>
			)}/>
			<Route path="/tasks">
				<br className="m-4"/>
				<TaskContext.Provider value = {{
						taskarray:this.state.userTasksArray,
						taskmap:this.state.tasksData,
						deleteTask:this.deleteTask.bind(this),
						startTime:this.startTime.bind(this),
						stopTime:this.stopTime.bind(this),
						resetTime:this.resetTime.bind(this)}}>

					<AllTasks 
						taskarray={this.state.userTasksArray}
						taskmap={this.state.tasksData}
					/>
				</TaskContext.Provider>
			</Route>
		</Switch>
		);

	}
};

export {TaskManager,TaskContext};