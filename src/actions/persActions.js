import {
	BUSCAR_PERS,
	BUSCAR_PERS_JSONFILE,
	BUSCAR_PERS_ERROR,
	BUSCAR_PERS_SUCCESS,
	SET_FAVORITE,
	REMOVE_FAVORITE,
	ADD_CHARACTER,
	ADD_CHARACTER_SUCCESS,
	ADD_CHARACTER_ERROR,
} from "../types";

//Buscar personajes
export function buscarPersonajes() {
	return (dispatch) => {
		dispatch(fetchAllCharacteres());
		try {
			fetch("http://hp-api.herokuapp.com/api/characters")
				.then((response) => response.json())
				.then((data) => {
					data = data.map((obj, idx) => ({ ...obj, id: idx, favorite: false }));
					dispatch(fetchAllCharacteresSuccess(data));
					return;
				})
				.catch((e) =>
					dispatch(
						fetchAllCharacteresError(
							"Error al obtener información de los personajes."
						)
					)
				);
		} catch (error) {
			dispatch(fetchAllCharacteresError(error));
		}

		//Archivo JSON
		fetch("http://localhost:4000/characteres")
			.then((response) => response.json())
			.then((data) => {
				data = data.map((obj) => ({ ...obj, favorite: false }));
				dispatch(fetchCharacteresJsonServer(data));
				return;
			})
			.catch((e) =>
				dispatch(
					fetchAllCharacteresError(
						"Error al obtener información de archivo jsonserver/db.json"
					)
				)
			);
	};
}

//Favorito
export function changeFavorite(id, value) {
	return (dispatch) => {
		dispatch(updateFav(id, value));
	};
}

//Quitar favorito
export function removeFavorite(id) {
	return (dispatch) => {
		dispatch(deleteFav(id));
	};
}

//Nuevo personaje
export function addCharacter(data) {
	return (dispatch) => {
		dispatch(addPers());
		try {
			fetch("http://localhost:4000/characteres", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					dispatch(addPersSuccess(data));
					return;
				})
				.catch((e) => dispatch(addPersError("Error al agregar personaje.")));
		} catch (error) {
			dispatch(addPersError(error));
		}
	};
}

const fetchAllCharacteres = () => ({
	type: BUSCAR_PERS,
});

const fetchAllCharacteresSuccess = (data) => ({
	type: BUSCAR_PERS_SUCCESS,
	payload: data,
});

const fetchCharacteresJsonServer = (data) => ({
	type: BUSCAR_PERS_JSONFILE,
	payload: data,
});

const fetchAllCharacteresError = (error) => ({
	type: BUSCAR_PERS_ERROR,
	payload: error,
});
const updateFav = (id, value) => ({
	type: SET_FAVORITE,
	payload: { id, value },
});
const deleteFav = (id) => ({
	type: REMOVE_FAVORITE,
	payload: id,
});
const addPers = () => ({
	type: ADD_CHARACTER,
});
const addPersSuccess = (data) => ({
	type: ADD_CHARACTER_SUCCESS,
	payload: data,
});
const addPersError = (error) => ({
	type: ADD_CHARACTER_ERROR,
	payload: error,
});
