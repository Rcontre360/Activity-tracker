import React from "react";

const Message = (props)=>{
	const {title,content,contentStyle,
		closeMessage,titleStyle} = props;

	React.useEffect(()=>{
		setTimeout(()=>{
			closeMessage();
		},3000);
	});

	return(
		<div className={"bg-"+contentStyle+" m-3 pt-3 p-2 text-center"}>
			<h3 className={"text-"+titleStyle}>{title}</h3>
			<p>{content}</p>
		</div>
	);
}

export default Message;