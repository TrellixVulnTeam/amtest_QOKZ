import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Button from "../button/Button";
import { useAlert } from "react-alert";

import Card from "../card/Card";
import Loading from "../loading/Loading";

import { buscarPersonajes } from "../../actions/persActions";

import "./cards.scss";

const Cards = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { pers } = useSelector((state) => state);
	const { pers: characters, error, loading } = pers;

	const [filter, setFilter] = useState(0);

	useEffect(() => {
		dispatch(buscarPersonajes());
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (error !== null && error !== "") alert.show(error);
		//eslint-disable-next-line
	}, [error]);

	return (
		<>
			<section>
				<div className="buttons-container">
					<Button onClickFn={() => setFilter(filter === 1 ? 0 : 1)}>
						Estudiantes
					</Button>
					<Button onClickFn={() => setFilter(filter === 2 ? 0 : 2)}>
						Staff
					</Button>
				</div>
			</section>
			<main>
				{loading ? (
					<Loading />
				) : (
					<Row>
						{characters.map((el) => {
							if (filter === 1)
								return el.hogwartsStudent ? (
									<Card key={el.id} person={el} />
								) : null;
							else if (filter === 2)
								return !el.hogwartsStudent ? (
									<Card key={el.id} person={el} />
								) : null;
							else return <Card key={el.id} person={el} />;
						})}
					</Row>
				)}
			</main>
		</>
	);
};

export default Cards;
