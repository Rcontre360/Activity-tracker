import React from "react";

const TimeClock = (props)=>{
	const {time} = props;
	return(
			<p>
				{("0"+Math.floor(time/3600000)%60).slice(-2)}h :
				{("0"+Math.floor(time/60000)%60).slice(-2)}m :
				{("0"+Math.floor(time/1000)%60).slice(-2)}s
			</p>
	);
}

export default TimeClock;