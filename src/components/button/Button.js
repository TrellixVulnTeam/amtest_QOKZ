import React from "react";
import "./button.scss";

const Button = (props) => {
	const { onClickFn } = props;
	return (
		<button className="hp-btn" onClick={() => onClickFn()}>
			{props.children}
		</button>
	);
};

export default Button;
