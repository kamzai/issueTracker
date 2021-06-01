import { AUTH, FETCH_USER_LIST, LOGOUT, UPDATE_USER } from "../Constants"

const auth = (state = { userData: null, userList: [] }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            return ({
                ...state,
                userData: action?.payload,
            });

        case LOGOUT:
            localStorage.clear();
            return ({
                ...state,
                userData: null
            });
        case FETCH_USER_LIST:
            return ({
                ...state,
                userList: action.payload
            })
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            return ({
                ...state,
                userData: action?.payload,
            });
        default:
            return (state);
    }
}

export default auth;


