import { CREATE, FETCH, UPDATE, DELETE, START_LOADING_PROJECT, END_LOADING_PROJECT} from "../Constants"

const project = (state={projectLoading: true, projectList: []}, action) => {
    switch (action.type) {
        case FETCH:
            return {
                ...state, 
                projectList: [...action.payload]
            }
        case CREATE: 
            return {
                ...state, 
                projectList: [...state.projectList, action.payload]
            }
        case UPDATE:
            return{
                ...state,
                projectList: [...state.projectList.map((project) => {return(project._id === action.payload._id ? action.payload : project)})]
            }
        case DELETE:
            return{...state, projectList: state.projectList.filter((project)=>{return project._id !== action.payload})}
        case START_LOADING_PROJECT:
            return{
                ...state, 
                projectLoading: true
            }
        case END_LOADING_PROJECT:
            return{
                ...state, 
                projectLoading: false
            }
    
        default:
            return {...state}
    }
}


export default project