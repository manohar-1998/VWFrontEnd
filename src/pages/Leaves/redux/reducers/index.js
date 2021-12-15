import { combineReducers } from "redux";
import { leavesReducer } from "./leavesReducer";
import { productReducer } from "./productReducer";

const reducers = combineReducers({
    allproducts: productReducer,
    allleaves: leavesReducer,
});
export default reducers;