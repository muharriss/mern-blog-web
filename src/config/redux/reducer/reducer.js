import { combineReducers } from "redux"
import globalReducer from "./globalReducer"
import blogReducer from "./blogReducer"
import createBlogReducer from "./createBlogReducer"

const reducer = combineReducers({blogReducer, globalReducer, createBlogReducer})

export default reducer