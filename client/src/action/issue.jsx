import * as api from '../api/index'
import { CREATE_ISSUE, END_LOADING_ISSUE, FETCH_ISSUE_LIST, START_LOADING_ISSUE, UPDATE_ISSUE } from "../Constants"

export const createIssue = (newIssue, history) => async(dispatch) => {
    try {

        dispatch({type: START_LOADING_ISSUE})

        const {data} = await api.createIssue(newIssue)
        dispatch({type: CREATE_ISSUE, payload: data})
        history.push(`/home/issue/${data._id}`)
    } catch (error) {
        console.log(error);
    }
}

export const fetchIssueList = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_ISSUE})

        const { data } = await api.fetchIssues();
        dispatch({ type: FETCH_ISSUE_LIST, payload: data })

        dispatch({type : END_LOADING_ISSUE})
        
    } catch (error) {
        console.log(error);
    }
}

export const updateIssue = (id, newIssue, history) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING_ISSUE})

        const {data} = await api.updateIssue(newIssue._id, newIssue)
        dispatch({type: UPDATE_ISSUE, payload: data})

        history.push(`/home/issue/pro/${id}`)

        dispatch({type : END_LOADING_ISSUE})
    } catch (error) {
        console.log(error);
    }
}


