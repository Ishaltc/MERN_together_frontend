import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { friendReducer } from "./friendReducer";
import friendsReducer from "./friendsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  friend:friendReducer,
  admin:adminReducer
  
});
export default rootReducer;
