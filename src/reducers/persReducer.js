import {
	BUSCAR_PERS,
	BUSCAR_PERS_ERROR,
	BUSCAR_PERS_SUCCESS,
	BUSCAR_PERS_JSONFILE,
	SET_FAVORITE,
	REMOVE_FAVORITE,
	ADD_CHARACTER,
	ADD_CHARACTER_SUCCESS,
	ADD_CHARACTER_ERROR,
} from "../types";

//state
const initialState = {
	pers: [],
	fav: [],
	favcount: 0,
	perscount: 0,
	error: null,
	loading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case BUSCAR_PERS:
		case ADD_CHARACTER:
			return {
				...state,
				loading: true,
			};
		case BUSCAR_PERS_SUCCESS:
			return {
				...state,
				pers: [...state.pers, ...action.payload],
				loading: false,
				perscount: state.perscount + action.payload.length,
			};
		case BUSCAR_PERS_JSONFILE:
			return {
				...state,
				pers: [...state.pers, ...action.payload],
				perscount: state.perscount + action.payload.length,
			};
		case BUSCAR_PERS_ERROR:
		case ADD_CHARACTER_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case SET_FAVORITE:
			return {
				...state,
				pers: state.pers.map((per, i) =>
					per.id === action.payload.id
						? { ...per, favorite: action.payload.value }
						: per
				),
				favcount: action.payload.value
					? state.favcount + 1
					: state.favcount - 1,
			};
		case REMOVE_FAVORITE:
			return {
				...state,
				pers: state.pers.map((per, i) =>
					per.id === action.payload ? { ...per, favorite: false } : per
				),
				favcount: state.favcount - 1,
			};
		case ADD_CHARACTER_SUCCESS:
			return {
				...state,
				pers: [...state.pers, action.payload],
				loading: false,
				perscount: state.perscount + 1,
			};
		default:
			return state;
	}
}
