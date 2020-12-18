import React from "react";
import {Switch,Route} from "react-router-dom";

import Sidebar from "../sidebar";
import Statistics from "../../pages/statistics";

const ChartContext = React.createContext();

class ChartManager extends React.Component{
	
	render(){

		return(
			<ChartContext.Provider value={this.props}>
				<Switch>
					<Route path="/statistics" component={Statistics}/>
				</Switch>
			</ChartContext.Provider>
		);
	}

};

export {ChartContext,ChartManager};
