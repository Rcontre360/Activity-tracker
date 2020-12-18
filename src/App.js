import React from "react";
import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import "./css/styles.css";

import {Redirect} from "react-router-dom"

import Navbar from "./components/navbar";
import {ChartManager} from "./components/charts/chartManager";
import {TaskManager} from "./components/tasks/taskManager";
import HomePage from "./pages/home";


class App extends React.Component{

	state = {
		startTime:Date.now(),
		tasksData:new Map(),
		userTasksArray:[],
		numTasks:0
	}

	async setNewState(newState){
		await this.setState({...newState});
	}

	render(){

		return(
		<BrowserRouter>
			<Redirect to="/home"/>
			<Navbar/>
			<Route path="/home" component={HomePage}/>
			<ChartManager {...this.state} />
			<TaskManager {...this.state} setNewState={this.setNewState.bind(this)}/>
		</BrowserRouter>
		);
	}

};


export  default App;