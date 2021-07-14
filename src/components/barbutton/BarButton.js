import React from "react";

import "./barbutton.scss";

const BarButton = (props) => {
	const { onClickFn } = props;
	return (
		<div className="bar-button" onClick={onClickFn}>
			{props.children}
		</div>
	);
};

export default BarButton;
