import React from "react";
import {Link} from "react-router-dom";
import ListItem from "./listItem";

const Navbar = ()=>{

  const navItems = [
    {to:"/home",children:"Home"},
    {to:"/tasks",children:"Your Tasks"},
    {to:"/newTask",children:"New Task"},
    {to:"/statistics/line",children:"Statistics"},
  ]

	return (
	<React.Fragment>
		<nav className="navbar p-0 pl-4 
    navbar-dark navbar-expand-lg static-top"
    id = "mainNavbar">
      <div className="container">
  		 	<h1  id="navbarTitle">
          Activity tracker
        </h1>

        <button id="myNavToggler" className="navbar-toggler" type="button" 
        data-toggle="collapse" data-target="#navbarResponsive" 
        aria-controls="navbarResponsive" aria-expanded="false" 
        aria-label="Toggle navigation">

           <span className="navbar-toggler-icon"></span>

        </button>

          <div className="collapse navbar-collapse" 
          id="navbarResponsive">
    				<ul className="navbar-nav ml-auto m-4">
                {navItems.map((el,id)=>{
                  return <ListItem {...el} key={id} className="text-white nav-link"/>
                })}
      			</ul>
          </div>
        </div>
		</nav>
	</React.Fragment>
	);
}

export default Navbar;