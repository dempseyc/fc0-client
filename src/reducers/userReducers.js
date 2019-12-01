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
    LOGOUT_USER
   } from '../actions/userActions';

const initialState = {
    user: {username: 'sign in / create user', loggedIn: false },
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
                messages: [action.message],
            }
        case USER_FOUND:
            return {
                ...state,
                user: {username: action.username},
                messages: [action.message]
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                user: {username: action.username},
                messages: [action.message]
            }
        case GET_USER:
            return {
                ...state,
                isFetching: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.user.username,
                    loggedIn: true
                },
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
                ...state,
                user: initialState.user,
                isFetching: false,
                messages: [action.type]
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: initialState.user,
                messages: initialState.messages
            }
        case POST_USER_FAILURE:
        case GET_USER_FAILURE:
            //// if payload.error.response.status = 401,
            //// reset user, not logged in, 
            //// remove cable subscription
            return {
                ...state,
                isFetching: false,
                payload: action.payload.error.response ? action.payload.error.response.data.errors : ['no error response'],
                messages: ['no valid user : login / signup']
            }
        default:
            return state;
    }
}
  
  export default userReducer

