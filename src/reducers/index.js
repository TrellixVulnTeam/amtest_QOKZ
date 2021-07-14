import { combineReducers } from "redux";
import persReducer from "./persReducer";

export default combineReducers({
	pers: persReducer,
});
