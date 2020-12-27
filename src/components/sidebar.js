import React from "react";
import {Link} from "react-router-dom";
import ListItem from "./listItem";

const Sidebar = (props)=>{

    const {setTimeLapse} = props;

    const chartItems = [
        {to:"line",children:"Line chart"},
        {to:"bar",children:"Bar chart"},
        {to:"pie",children:"Pie chart"},
    ]

    const timeItems = [
        {to:"#",children:"Today",onClick:setTimeLapse.bind(this,"day")},
        {to:"#",children:"This week",onClick:setTimeLapse.bind(this,"week")},
        {to:"#",children:"This month",onClick:setTimeLapse.bind(this,"month")},
        {to:"#",children:"This year",onClick:setTimeLapse.bind(this,"year")}
    ]

	return (

    <div id="sidebarContainer">
    <div className="row">
    	<nav id="sidebar"className="col-9">

    		<div>
    	        <h3 className="p-4 text-light">Your Statistics</h3>
    	    </div>

            <ul className="navbar-nav m-4">
                <li className="active">
                    <p href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                    	All charts
                    </p>
                    <ul className="collapse" id="homeSubmenu">
                        {chartItems.map((el,id)=>{
                            return <ListItem {...el} key={id} className="text-white nav-link"/>
                        })}
                    </ul>
                </li>

                <li className="active">
                    <p href="#timeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        Set Time Lapse
                    </p>
                    <ul className="collapse" id="timeSubmenu">
                        {timeItems.map((el,id)=>{
                            return <ListItem {...el} key={id} className="text-white nav-link"/>
                        })}
                    </ul>
                </li>

                <ListItem to="/about" className="text-white nav-link"
                children="About"/>
     
            </ul>

    	</nav>
        <div className="col-2 bg-light p-0 m-0 navbar-light">
             <button className ="m-0 navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#sidebar" 
                aria-controls="sidebar" aria-expanded="false" 
                aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
    </div>
	);
}


export default Sidebar;



/*BUTTON TO SHOW AND HIDE SIDEBAR
<div id="content">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

            <button type="button" id="sidebarCollapse" className="btn btn-info">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>

        </div>
    </nav>
</div>
*/