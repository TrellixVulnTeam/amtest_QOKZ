import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Row, Col, Form as FormBS, Button } from "react-bootstrap";

import { addCharacter } from "../../actions/persActions";

import "./form.scss";

import closeicon from "../../assets/Dell_light.png";

const Form = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const { pers } = useSelector((state) => state);
	const { perscount } = pers;
	const [form, setForm] = useState({
		name: "",
		dateOfBirth: "",
		eyeColour: "",
		hairColour: "",
		gender: "female",
		house: "Gryffindor",
		hogwartsStudent: true,
		image: "",
		alive: true,
	});
	const [errorName, setErrorName] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleForm = (e) => {
		e.preventDefault();
		if (form.name.trim() === "") {
			setErrorName("Ingresa un nombre");
			return;
		}
		form.id = perscount;
		form.hogwartsStudent === "true" || form.hogwartsStudent === true
			? (form.hogwartsStudent = true)
			: (form.hogwartsStudent = false);
		form.alive === "true" || form.alive === true
			? (form.alive = true)
			: (form.alive = false);
		dispatch(addCharacter(form));
		setShow(false);
	};

	return (
		<Modal show={show} onHide={setShow} size="lg">
			<Modal.Header>
				<Modal.Title>Agrega un personaje</Modal.Title>
				<button type="button" className="close" onClick={() => setShow(false)}>
					<img src={closeicon} alt="Cerrar" />
				</button>
			</Modal.Header>
			<Modal.Body>
				<FormBS onSubmit={(e) => handleForm(e)}>
					<Row>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Nombre</FormBS.Label>
								<FormBS.Control
									type="text"
									name="name"
									value={form.name}
									onChange={(e) => {
										setErrorName("");
										handleChange(e);
									}}
								/>
								<FormBS.Text className="error">{errorName}</FormBS.Text>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Cumpleaños</FormBS.Label>
								<FormBS.Control
									type="date"
									name="dateOfBirth"
									value={form.dateOfBirth}
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Color de Ojos</FormBS.Label>
								<FormBS.Control
									type="text"
									name="eyeColour"
									value={form.eyeColour}
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Color de Pelo</FormBS.Label>
								<FormBS.Control
									type="text"
									name="hairColour"
									value={form.hairColour}
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Casa</FormBS.Label>
								<select
									className="form-control"
									name="house"
									onChange={(e) => handleChange(e)}
								>
									<option value="Gryffindor">Gryffindor</option>
									<option value="Slytherin">Slytherin</option>
									<option value="Hufflepuff">Hufflepuff</option>
									<option value="Ravenclaw">Ravenclaw</option>
								</select>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Vivo</FormBS.Label>
								<br />
								<FormBS.Check
									inline
									label="Vivo"
									type="radio"
									name="alive"
									value="true"
									onChange={(e) => handleChange(e)}
									defaultChecked={true}
								/>
								<FormBS.Check
									inline
									label="Finado"
									type="radio"
									name="alive"
									value="false"
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Género</FormBS.Label>
								<br />
								<FormBS.Check
									inline
									label="Mujer"
									type="radio"
									name="gender"
									value="female"
									onChange={(e) => handleChange(e)}
									defaultChecked={true}
								/>
								<FormBS.Check
									inline
									label="Hombre"
									type="radio"
									name="gender"
									value="male"
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col sm={6}>
							<FormBS.Group controlId="">
								<FormBS.Label>Posición</FormBS.Label>
								<br />
								<FormBS.Check
									inline
									label="Estudiante"
									type="radio"
									name="hogwartsStudent"
									value="true"
									onChange={(e) => handleChange(e)}
									defaultChecked={true}
								/>
								<FormBS.Check
									inline
									label="Staff"
									type="radio"
									name="hogwartsStudent"
									value="false"
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col xs={12}>
							<FormBS.Group controlId="">
								<FormBS.Label>URL Imágen</FormBS.Label>
								<FormBS.Control
									type="text"
									name="image"
									value={form.image}
									onChange={(e) => handleChange(e)}
								/>
							</FormBS.Group>
						</Col>
						<Col xs={12} className="text-center">
							<FormBS.Group controlId="">
								<Button type="submit">Guardar</Button>
							</FormBS.Group>
						</Col>
					</Row>
				</FormBS>
			</Modal.Body>
		</Modal>
	);
};

export default Form;
