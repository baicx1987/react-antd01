/**
 * 引入createStore方法，创建store
 */
import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default ()=>{
    return createStore(reducer, composeWithDevTools());
}
