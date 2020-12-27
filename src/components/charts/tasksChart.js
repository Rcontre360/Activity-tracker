import React from "react";
import {DataContext} from "./dataManager";
import ChartConfig from "./chartData";

const TasksChart = (props)=>{
	let allData= React.useContext(DataContext);

	React.useEffect(()=>{
		const cnx = document.getElementById("myChart");
		const aux = new ChartConfig(props.show,allData,cnx);
		window.onload = aux.startChart();
	},[props.show]);

	return(
		<div className="container pt-4">
			<canvas id="myChart">

			</canvas>
		</div>
	);
}


export default TasksChart;