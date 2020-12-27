import React from "react";

const Form = (props)=>{
	const {values} = props;

	const typeElement = (el,id)=>{
		if (el.type==="submit")
			return(
				<button id={el.name} {...el} onClick={(e)=>{
					e.preventDefault();
					el.onClick(e);
				}}>{el.name}</button>
			);
		if (el.type==="textarea")
			return(
			<React.Fragment>
				<label {...el.label} htmlFor={el.name}>{el.name}</label>
				<textarea id={el.name} {...el} onChange={(e)=>el.onChange(el.arg[0],e)}></textarea>
			</React.Fragment>
			);
		if (el.type==="checkbox")
			return(
			<React.Fragment>
				<input key={id} id={el.name} {...el} onChange={(e)=>el.onChange(el.arg[0],e)}/>
				<label {...el.label} htmlFor={el.name}>{el.name}</label>
			</React.Fragment>
			);
		return(
			<React.Fragment>
				<label {...el.label} htmlFor={el.name}>{el.name}</label>
				<input key={id}  id={el.name} {...el} onChange={(e)=>el.onChange(el.arg[0],e)}/>
			</React.Fragment>
		);
	}

	return(
		<form className="form-group">
			{values.map((el,id)=>{

				return(
					<div key={id} {...el.wraper}>
						{typeElement(el)}
					</div>
				);
			})}
		</form>	
	);
}

export default Form;
