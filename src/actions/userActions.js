import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const USER_FOUND = 'USER_FOUND';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';

export const POST_USER = 'POST_USER';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER = 'GET_USER';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const PUT_USER = 'PUT_USER';
export const PUT_USER_SUCCESS = 'PUT_USER';
export const PUT_USER_FAILURE = 'PUT_USER_FAILURE';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const RESET_USER = 'RESET_USER';

export function fetchUsers () {
    return function (dispatch) {
        dispatch(getUsers());
        const url = `${API_URL}api/users`;
        return axios.get(url)
        .then(response => {
            dispatch(getUsersSuccess(response.data));
        })
        .catch(error => dispatch(getUsersFailure(error)))
    }
}

function getUsers () {
    return {
        type: GET_USERS,
    }
}

function getUsersSuccess (users) {
    return {
        type: GET_USERS_SUCCESS,
        users: users,
        message: 'get users success'
    }
}

function getUsersFailure (error) {
    return {
        type: GET_USERS_FAILURE,
        message: 'get users failure'
    }
}

export function findUser (username, users) {
    return function (dispatch) {
        if (users[username]) {
            dispatch(userFound(username));
        } else {
            dispatch(userNotFound(username));
        }
    }
}

function userFound (username) {
    return {
        type: USER_FOUND,
        username: username,
        message: `${username} found`
    }
}

function userNotFound (username) {
    return {
        type: USER_NOT_FOUND,
        username:  `enter email to create user ${username}`,
        message: `${username} not found`
    }
}

export function createUser (details) {
    return function (dispatch) {
        dispatch(postUser(details));
        const url = `${API_URL}api/users`;
        return axios.post(url, {
            user: {
                username: details.username,
                email: details.email,
                password: details.password
            }
        })
        .then(response => {
            dispatch(postUserSuccess(response.data));
            dispatch(loginUser(details));
        })
        .catch(error => dispatch(postUserFailure(error)))
    }
}

function postUser(details) {
    return {
        type: POST_USER,
        details: details,
        message: 'post user'
    }
}

function postUserSuccess(id) {
    return{
        type: POST_USER_SUCCESS,
        id: id,
        message: 'post user success'
    }
}

function postUserFailure (error) {
    return {
        type: POST_USER_FAILURE,
        payload: { error },
        message: 'post user failure'
    }
}

export function loginUser (details) {
    return function (dispatch) {
        var basicAuth = 'Basic ' + btoa(details.username + ':' + details.password);
        let url = `${API_URL}api/auth/login`;
        return axios.post(url, {}, {
            headers: {'Authorization': basicAuth} 
        })
        .then(response => dispatch(receiveToken(response.data)))
        .catch(error => dispatch(loginUserFailure(error)))
    }
}

function loginUserFailure (error) {
    return {
        type: LOGIN_USER_FAILURE,
        payload: { error },
        message: 'login user failure'
    }
}

function receiveToken (data) {
    return function (dispatch) {
        localStorage.setItem('token',data.token);
        localStorage.setItem('id',data.id);
        dispatch(fetchUsers());
        dispatch(fetchUser());
    }
}

export function fetchUser () {
    return function (dispatch) {
        const token = localStorage.token;
        const id = localStorage.id;
        const url = `${API_URL}api/users/${id}`;
        if (token) {
            dispatch(getUser(id));
            return axios.get(url, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(response => dispatch(getUserSuccess(response.data)))
            .catch(error => dispatch(getUserFailure(error)))
        }
    }
}

function getUser(id) {
    return {
        type: GET_USER,
        id: id
    }
}

function getUserFailure (error) {
    return {
        type: GET_USER_FAILURE,
        payload: { error },
        message: 'request user failure'
    }
}

function getUserSuccess (user) {
    return {
        type: GET_USER_SUCCESS,
        user: user
    }
}

export function logoutUser (username) {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        dispatch(resetUser(username));
        dispatch(fetchUsers());
    }
}

function resetUser (username) {
    return{
        type: RESET_USER,
        username: username,
    }
}


