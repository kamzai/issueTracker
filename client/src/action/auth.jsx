import * as api from '../api/index'
import {AUTH, FETCH_USER_LIST, UPDATE_USER} from '../Constants'
 

export const fetchUsers = () => async(dispatch) => {
    try {
        
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH_USER_LIST, payload: data})

    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (newProfileData) => async(dispatch) => {
    try {
        
        const {data} = await api.updateProfile(newProfileData);
        dispatch({type: UPDATE_USER, payload: data})

    } catch (error) {
        console.log(error)
    }
}

export const signIn = (userData, history) => async(dispatch) => {
    try {
        // LogIn the users   
        const {data} = await api.signIn(userData);
        dispatch({type : AUTH, payload: data});

        history.push('/home/dashboard');
    } catch (error) {
        console.log(error)
    }
}


export const signUp = (userData, history) => async(dispatch) => {
    try {
        // signUp the users      
        const {data} = await api.signUp(userData);
        dispatch({type : AUTH, payload: data});

        history.push('/home/dashboard');
    } catch (error) {
        console.log(error)
    }
}

