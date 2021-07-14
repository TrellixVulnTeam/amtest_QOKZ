import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import BarButton from "../barbutton/BarButton";
import FavItem from "../favitem/FavItem";
import Form from "../form/Form";
import { useAlert } from "react-alert";

import "./bar.scss";

import favicon from "../../assets/Bookmark_fill.png";
import addicon from "../../assets/User_fill_add.png";

const Bar = () => {
	const alert = useAlert();
	const { pers } = useSelector((state) => state);
	const { pers: favs, error } = pers;

	const [favorites, setFavorites] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		setFavorites(favs.filter((fav) => fav.favorite));
	}, [favs]);

	useEffect(() => {
		if (error !== null && error !== "") alert.show(error);
		//eslint-disable-next-line
	}, [error]);

	return (
		<>
			{show && <Form show={show} setShow={setShow} />}
			<div className="bar-container">
				<Dropdown>
					<Dropdown.Toggle>
						<BarButton>
							Favoritos
							<img src={favicon} alt="Favorito" />
						</BarButton>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{favorites.length > 0 ? (
							favorites.map((fav) => <FavItem key={fav.id} item={fav} />)
						) : (
							<div className="fav-item">No hay favoritos</div>
						)}
					</Dropdown.Menu>
				</Dropdown>
				<BarButton onClickFn={() => setShow(!show)}>
					Agregar
					<img src={addicon} alt="Agregar" />
				</BarButton>
			</div>
		</>
	);
};

export default Bar;
