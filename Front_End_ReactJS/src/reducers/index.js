import {combineReducers} from "redux";
import erroReducer from "./erroReducer";
export default combineReducers({errors:erroReducer});