import React from "react";
import ListItem from "./listItem";

const navItems = [
    {to:"/home",children:"Home"},
    {to:"/tasks",children:"Your Tasks",logged:"true"},
    {to:"/newTask",children:"New Task",logged:"true"},
    {to:"/statistics/line",children:"Statistics",logged:"true"},
    {to:"/register",children:"Register",logged:"false"},
    {to:"/login",children:"Login",logged:"false"},
    {to:"/home",children:"Logout",logged:"true"}
]

const Navbar = (props)=>{
  const {logged,logout} = props;

  navItems[6].onClick = logout; 

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
                  console.log(el.logged,logged)
                  if (el.logged==undefined || el.logged==logged)
                    return <ListItem {...el} key={id} className="text-white nav-link"/>
                  })
                }
      			</ul>
          </div>
        </div>
		</nav>
	</React.Fragment>
	);
}

export default Navbar;