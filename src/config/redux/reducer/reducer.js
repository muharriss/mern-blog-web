import { combineReducers } from "redux"
import globalReducer from "./globalReducer"
import blogReducer from "./blogReducer"
import createBlogReducer from "./createBlogReducer"
import blogUserReducer from "./blogUserReducer"

const reducer = combineReducers({blogReducer, globalReducer, createBlogReducer, blogUserReducer})

export default reducer