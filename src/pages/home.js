import React from "react";
import {Link} from "react-router-dom";

const HomePage = ()=>{

	return(
		<div className="mx-auto col-10">
			<div className="jumbotron text-center mb-0 p-4 bg-white">
				<h1 className="display-4">Welcome to your Task Tracker</h1>
				<p className="lead">Increase your productivity with our app!</p>
				
				<p>With our application you can keep track of your activity and
				avoid wasting time for lack of information. You only need to add
				a new task and keep track of how much time you spend on it</p>
			
				<div className="row mx-auto">
					<div className="col-6 text-center">
						<Link to="/tasks" className="btn btn-primary m-1">Add a new Tasks!</Link>
					</div>
					<div className="col-6 text-center">
						<Link to="#" className="btn btn-primary m-1">Sing up!</Link>
					</div>
				</div>
				<img src="./assets/1.png" 
					className="card-img m-4 col-8" 
					alt="mis ruños jaja"
					id="taskImage"
					/>
			</div>
		</div>
	);
}

export default HomePage;