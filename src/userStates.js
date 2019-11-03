export const userStates = {
    DEFAULT: 'DEFAULT', //no token, un not entered
    GOT_USERS: 'GOT_USERS',
    NO_USERS: 'NO_USERS',
    FINDING: 'FINDING', //no token, un entered
    FOUND: 'FOUND', //no token, un found, enter pw
    NOT_FOUND: 'NOT_FOUND', //no token, un not found, enter email and pw to create user
    CREATING: 'CREATING', //creating user
    CREATED: 'CREATED', //user created
    VERIFYING: 'VERIFYING', //no token, pw entered
    VERIFYED: 'VERIFYED', // token received, no user yet
    FETCHING: 'FETCHING', // token received, fetching user
    READY: 'READY', // token, user fetched
    LOGGED_OUT: 'LOGGED_OUT'
};