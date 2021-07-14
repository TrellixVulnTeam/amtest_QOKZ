import React from "react";
import { useDispatch } from "react-redux";

import { removeFavorite } from "../../actions/persActions";

import trashicon from "../../assets/Trash.png";

import "./favitem.scss";

const FavItem = ({ item }) => {
	const { id, image, name } = item;
	const dispatch = useDispatch();

	const deleteFavorite = () => {
		dispatch(removeFavorite(id));
	};

	return (
		<div className="fav-item">
			<img className="main-pic" src={image} alt="Character" />
			{name}
			<img
				className="trash-icon"
				src={trashicon}
				alt="Eliminar"
				onClick={() => deleteFavorite()}
			/>
		</div>
	);
};

export default FavItem;
