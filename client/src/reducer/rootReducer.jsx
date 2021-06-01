import { combineReducers } from "redux";
import project from './project'
import issue from './issue'
import auth from './auth'

export default combineReducers({
    project, 
    issue,
    auth,
})