import React from "react";
import {Switch,Route} from "react-router-dom";

import Sidebar from "../sidebar";
import Statistics from "../../pages/statistics";

const DataContext = React.createContext();

class DataManager extends React.Component{
	
	render(){

		return(
			<DataContext.Provider value={this.props}>
				<Switch>
					<Route path="/statistics" component={Statistics}/>
				</Switch>
			</DataContext.Provider>
		);
	}

};

export {DataContext,DataManager};
