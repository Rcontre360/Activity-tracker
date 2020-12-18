import React from "react";
import {Link} from "react-router-dom";

const ListItem = (props)=>{

	return (
		<li className="nav-item">
          	<Link {...props}></Link>
        </li>
	);
}

export default ListItem;