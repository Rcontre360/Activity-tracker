import React from "react";
import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import "./css/styles.css";

import {Redirect} from "react-router-dom"
import axios from "axios";

import Navbar from "./components/navbar";
import {DataManager} from "./components/charts/dataManager";
import {TaskManager} from "./components/tasks/taskManager";
import UserManager from "./components/users/userManager";
import HomePage from "./pages/home";

class App extends React.Component{

	state = {
		tasks:{
			tasksData:new Map(),
			userTasksArray:[],
			numTasks:0,
		},
		user:{
			isLoggedIn:"false",
			name:undefined,
			email:undefined,
			initDate:undefined,
		}
	}

	async setNewState(newState){
		await this.setState({...newState});
	}

	async logout(){

		const val = await axios({
			method:"post",
			url:"http://localhost:4000/user/logout",
			data:this.state.user
		});
		this.setState({user:{
			isLoggedIn:"false",
			name:undefined,
			email:undefined,
			initDate:undefined,
		}})
	}

	render(){

		return(
		<BrowserRouter>
			
			<Redirect to="/home"/>
			<Navbar logout={this.logout.bind(this)} logged = {this.state.user.isLoggedIn}/>
			<Route path="/home" component={HomePage}/>
			<DataManager {...this.state.tasks} />
			<TaskManager {...this.state.tasks} setNewState={this.setNewState.bind(this)}/>
			<UserManager setNewState={this.setNewState.bind(this)}/>
		</BrowserRouter>
		);
	}

};


export  default App;