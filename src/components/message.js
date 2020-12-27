import React from "react";

const Message = (props)=>{
	const {values} = props;
	const [aux,render] = React.useState(true);

	React.useEffect(()=>{
		setInterval(()=>{
			for (var k in values)
				values[k].active = false;
			render(!aux);
		},7000)
	},[values]);

	return(
	<React.Fragment>
		{	
		values.map((message,id)=>{
			const {titleStyle,title,content,customColor} = message;

			const contentStyle = message.contentStyle;

			if (!message.active)
				return;

			return(
				<div style={{background:customColor}} key={id} className={"bg-"+contentStyle+" m-3 pt-3 p-2 text-center"}>
					<h3 className={"text-"+titleStyle}>{title}</h3>
					<p>{content}</p>
				</div>
			);
		})
		}
	</React.Fragment>
	);
}

export default Message;