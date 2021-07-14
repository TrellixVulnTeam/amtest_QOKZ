import React from "react";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { changeFavorite } from "../../actions/persActions";

import "./card.scss";

import favicon from "../../assets/Rectangle1.png";
import faviconset from "../../assets/RectangleN.png";
import nopic from "../../assets/nopicture.png";

const Card = ({ person }) => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { pers } = useSelector((state) => state);
	const { favcount } = pers;
	const {
		id,
		name,
		gender,
		dateOfBirth,
		eyeColour,
		hairColour,
		alive,
		house,
		hogwartsStudent,
		image,
		favorite,
	} = person;

	const updtFavorite = () => {
		if (favcount < 5 || favorite) dispatch(changeFavorite(id, !favorite));
		else alert.show("Solo puedes guardar 5 favoritos.");
	};

	return (
		<Col xs={6}>
			<div className="hp-card">
				<Row>
					<Col
						lg={5}
						className={classNames({
							"card-image": true,
							slytherine: house === "Slytherin",
							hufflepuff: house === "Hufflepuff",
							ravenclaw: house === "Ravenclaw",
						})}
					>
						<div className="card-img-container">
							<img className="main-pic" src={image?image:nopic} alt="Character" />
						</div>
					</Col>
					<Col
						lg={7}
						className={classNames({ "card-body": true, death: !alive })}
					>
						<img
							className="fav-icon"
							src={favorite ? faviconset : favicon}
							alt="Favorito"
							onClick={() => updtFavorite()}
						/>
						<p className="top">
							<span>{alive ? "Vivo" : "Finado"}</span>
							<span>{hogwartsStudent ? "Estudiante" : "Staff"}</span>
						</p>
						<h3>{name}</h3>
						<p>
							<strong>Cumpleaños:</strong> {dateOfBirth}
						</p>
						<p>
							<strong>Género:</strong> <span>{gender}</span>
						</p>
						<p>
							<strong>Color de ojos:</strong> <span>{eyeColour}</span>
						</p>
						<p>
							<strong>Color de pelo:</strong> <span>{hairColour}</span>
						</p>
					</Col>
				</Row>
			</div>
		</Col>
	);
};

export default Card;
