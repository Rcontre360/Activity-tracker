import React from "react";
import {Switch,Route} from "react-router-dom";
import axios from "axios";

import Registration from "../../pages/registration";
import Login from "../../pages/login";

axios.defaults.withCredentials = true;

class UserManager extends React.Component{

	state = {
		user:{
			name:undefined,
			email:undefined,
			isLoggedIn:"false"
		}
	}

	createUser(user){
		return new Promise(async (resolve,reject)=>{
			const val = await axios({
				method:"post",
				url:"http://localhost:4000/user/register",
				data:user
			});

			if (val.data)
				resolve(val.data);

			if (val.data.message==="NO_EXIST"){
				this.setState({user:{...user,isLoggedIn:"true"}})
				this.props.setNewState({user:{...user,isLoggedIn:"true"}})
			}
		})
	}

	login(guest){
		return new Promise(async (resolve,reject)=>{
			const val = await axios({
				method:"post",
				url:"http://localhost:4000/user/login",
				data:guest
			});

			if (val.data)
				resolve(val.data);

			if (val.data.name && val.data.email){
				await this.setState({user:{...guest,isLoggedIn:"true"}});
				await this.props.setNewState({user:{...guest,isLoggedIn:"true"}})
			}

		});
	}
	
	render(){

		return(
			<Switch>

				<Route path="/account"/>
				<Route path="/register"	render={(p)=>(
					<Registration {...p}  createUser={this.createUser.bind(this)}/>
				)}/>
				<Route path="/login" render={(p)=>(
					<Login {...p} login={this.login.bind(this)}/>
				)}/>

			</Switch>
		);
	}

};

export default UserManager;