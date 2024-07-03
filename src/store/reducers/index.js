import {combineReducers} from "redux";
import userReducer from "./userReducer";
import serverReducer from "./serverReducer";
import backdropReducer from "./backdropReducer";
import authReducer from "./authReducer";


export default combineReducers({
  server: serverReducer,
  user: userReducer,
  backDrop: backdropReducer,
  auth: authReducer,
});
