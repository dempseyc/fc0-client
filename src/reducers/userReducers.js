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
    STORE_CREDENTIALS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT_USER,
   } from '../actions/userActions'

import {
    POST_PROMPT_FAILURE,
    POST_RETORT_FAILURE,
} from '../actions/contentActions'

const initialState = {
    user: {
        username: '', 
        credentials: {
            username: '',
            password: '',
            email: ''
        },
        notFound: false,
        loggedIn: false 
    },
    isFetching: false,
    users: {},
    usersById: {},
    messages: ['sign in or create user']
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
        // case GET_USERS:
        //     return {
        //         ...state,
        //         isFetching: true,
        //     }
        // case GET_USERS_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         serverOnline: true,
        //         users: action.users,
        //         usersById: flipKeyValue(action.users)
        //     }
        // case GET_USERS_FAILURE:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         user: {...state.user, username: '', loggedIn: false, isFetching: false},
        //         serverOnline: false,
        //         messages: [action.message],
        //     }
        // case USER_FOUND:
        //     return {
        //         ...state,
        //         user: {...state.user, username: action.username, found: true},
        //         messages: [action.message]
        //     }
        // case USER_NOT_FOUND:
        //     return {
        //         ...state,
        //         user: {...state.user, username: action.username, found: false},
        //         messages: [action.message]
        //     }
        case GET_USER:
            return {
                ...state,
                isFetching: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    id: action.user.id,
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
        case STORE_CREDENTIALS:
            return {
                ...state,
                user: {...state.user, credentials: action.payload}
            }
        case LOGIN_USER_FAILURE:
            switch (action.payload.error) {
                case 'not found':
                    return {
                        ...state,
                        user: {...state.user, notFound: true},
                        isFetching: false,
                        messages: [action.payload.error]
                    }
                case 'wrong password':
                    return {
                        ...state,
                        user: {...state.user, notFound: false, credentials: {} },
                        isFetching: false,
                        messages: [action.payload.error]
                    }
                default:
                    return {
                        ...state,
                        user: initialState.user,
                        isFetching: false,
                        messages: [action.type]
                    }
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: initialState.user,
                messages: initialState.messages
            }
        case POST_USER_FAILURE:
        case POST_PROMPT_FAILURE:
        case POST_RETORT_FAILURE:
        case GET_USER_FAILURE:
            //// if payload.error.response.status = 401,
            //// reset user, not logged in, 
            //// remove cable subscription
            return {
                ...state,
                isFetching: false,
                user: initialState.user,
                payload: action.payload.error.response ? action.payload.error.response.data.errors : ['no error response'],
                messages: ['no valid user : login / signup']
            }
        default:
            return state;
    }
}
  
  export default userReducer

