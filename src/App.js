import { Container } from "react-bootstrap";
import Bar from "./components/bar/Bar";
import Cards from "./components/cards/Cards";

import { Provider } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/app.scss";

import headerImg from "./assets/Group_1.png";

function App() {
	const options = {
		position: positions.BOTTOM_CENTER,
		timeout: 3000,
		offset: "30px",
		transition: transitions.SCALE,
		color: "white",
	};
	return (
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<Container className="position-relative">
					<Bar />
					<header>
						<div className="header">
							<img src={headerImg} alt="Harry Potter" className="" />
							<h1>Selecciona tu filtro</h1>
						</div>
					</header>
					<Cards />
				</Container>
			</AlertProvider>
		</Provider>
	);
}

export default App;
