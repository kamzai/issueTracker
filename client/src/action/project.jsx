import * as api from '../api/index'
import { FETCH, CREATE, UPDATE, DELETE, START_LOADING_PROJECT, END_LOADING_PROJECT } from "../Constants"

export const createProject = (newProject) => async (dispatch) => {
    try {

        dispatch({type :START_LOADING_PROJECT})
        const { data } = await api.createProject(newProject)
        dispatch({ type: CREATE, payload: data })
        dispatch({type: END_LOADING_PROJECT})

    } catch (error) {
        console.log(error);
    }
}

export const fetchProjectList = () => async (dispatch) => {
    try {

        dispatch({type :START_LOADING_PROJECT})

        const { data } = await api.fetchProjects();
        dispatch({ type: FETCH, payload: data })
        dispatch({type: END_LOADING_PROJECT})
        
    } catch (error) {
        console.log(error);
    }
}

export const updateProject = (id, updatedProject) => async (dispatch) => {
    try {
        const { data } = await api.updateProject(id, updatedProject);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deleteProject = (id, history) => async (dispatch) => {
    try {
        await api.deleteProject(id);
        history.push('/home/project');
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}