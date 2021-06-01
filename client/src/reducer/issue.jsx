import {CREATE_ISSUE, END_LOADING_ISSUE, FETCH_ISSUE_LIST, START_LOADING_ISSUE, UPDATE_ISSUE} from "../Constants"

const issue = (state={issueLoading : true, issueList:[]}, action) => {
    switch (action.type) {
        case CREATE_ISSUE:
            return {
                ...state, 
                issueList: [...state.issueList, action.payload]
            }
        case FETCH_ISSUE_LIST:
            return{
                ...state,
                issueList: [...action.payload]
            }
        case UPDATE_ISSUE:
            return {
                ...state, 
                issueList: [...state.issueList.map((issueData) => issueData._id === action.payload._id ? action.payload : issueData) ]
            }
        case START_LOADING_ISSUE:
            return{
                ...state,
                issueLoading : true
            }
        case END_LOADING_ISSUE:
            return{
                ...state,
                issueLoading : false
            }
        default:
            return state       
    }
}

export default issue;