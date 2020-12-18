import React from "react";
import {Route,Switch} from "react-router-dom";
import Sidebar from "../components/sidebar";
import TasksChart from "../components/charts/tasksChart";

const Statistics = (props)=>{
	const {match} = props;
	const [timeLapse,setTimeLapse] = React.useState("week");

	return (
		<div className="wrapper">
			<Sidebar setTimeLapse={setTimeLapse.bind(this)}/>
			<Route path={match.url+"/line"}
				render={(p)=>(
					<TasksChart {...p} type="line" show={timeLapse}/>
				)}/>
			<Route path={match.url+"/bar"}
				render={(p)=>(
					<TasksChart {...p} type="bar" show={timeLapse}/>
				)}/>
			<Route path={match.url+"/pie" }
				render={(p)=>(
					<TasksChart {...p} type="pie" show={timeLapse}/>
				)}/>
		</div>	
	);
} 

export default Statistics;

/*
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}
*/


