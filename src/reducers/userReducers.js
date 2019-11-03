import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    USER_FOUND,
    USER_NOT_FOUND,
    POST_USER,
    POST_USER_SUCCESS,
    POST_USER_FAILURE,
    LOGIN_USER_FAILURE,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    RESET_USER
   } from '../actions/userActions';

const initialState = {
    user: {username: 'not signed in'},
    isFetching: false,
    users: {},
    usersById: {},
    messages: ['no messages']
};

function flipKeyValue (lookupObj) {
    let revLookupObj = {};
    for (let key in lookupObj) {
        revLookupObj[lookupObj[key]] = key;
    }
    return revLookupObj;
}

function userReducer (state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                isFetching: true,
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.users,
                usersById: flipKeyValue(action.users)
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                messages: action.message,
            }
        case USER_FOUND:
            return {
                ...state,
                user: {username: action.username},
                messages: action.message
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                user: {username: action.username},
                messages: action.message
            }
        case GET_USER:
            return {
                ...state,
                isFetching: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isFetching: false,
                messages: ['ready']
            }
        case POST_USER:
            return {
                ...state,
                isFetching: true
            }
        case POST_USER_SUCCESS:
            return {
                ...state,
                user: {...state.user, id: action.id},
                isFetching: false,
                messages: [`user: ${state.user.username} created`]
            }
        case LOGIN_USER_FAILURE:
            return {
                user: initialState.user,
                isFetching: false,
                messages: action.type
            }
        case RESET_USER:
            return {
                ...initialState,
                user: {username: `${action.username} logged out`}
            }
        case POST_USER_FAILURE:
        case GET_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                messages: action.payload.error.response ? action.payload.error.response.data.errors : ['no data']
            }
        default:
            return state;
    }
}
  
  export default userReducer

