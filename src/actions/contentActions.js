import axios from 'axios'
import { newCurrPage } from './viewsActions'

import { API_URL } from './API_URL'

export const REQUEST_PROMPTS = 'REQUEST_PROMPTS'
export const FETCH_PROMPTS_FAILURE = 'FETCH_PROMPTS_FAILURE'
export const RECEIVE_PROMPTS = 'RECEIVE_PROMPTS'

export const REQUEST_RETORTS = 'REQUEST_RETORTS'
export const RECEIVE_RETORTS = 'RECEIVE_RETORTS'
export const FETCH_RETORTS_FAILURE = 'FETCH_RETORTS_FAILURE'

export const SELECT_PROMPT = 'SELECT_PROMPT'

export const POST_PROMPT = 'POST_PROMPT'
export const POST_PROMPT_FAILURE = 'POST_PROMPT_FAILURE'

export const POST_RETORT = 'POST_RETORT'
export const POST_RETORT_FAILURE = 'POST_RETORT_FAILURE'

export const PUT_PROMPT = 'PUT_PROMPT'
export const PUT_PROMPT_FAILURE = 'PUT_PROMPT_FAILURE'

export const PUT_RETORT = 'PUT_RETORT'
export const PUT_RETORT_FAILURE = 'PUT_RETORT_FAILURE'

export const POST_LIKE = 'POST_LIKE'
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS'
export const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE'

export const GET_LIKES = 'GET_LIKES'
export const GET_LIKES_SUCCESS = 'GET_LIKES_SUCCESS'
export const GET_LIKES_FAILURE = 'GET_LIKES_FAILURE'

export const DELETE_LIKE = 'DELETE_LIKE'
export const DELETE_LIKE_SUCCESS = 'DELETE_LIKE_SUCCESS'
export const DELETE_LIKE_FAILURE = 'DELETE_LIKE_FAILURE'

function requestPrompts() {
    return {
        type: REQUEST_PROMPTS
    }
}

function receivePrompts(json) {
    return {
        type: RECEIVE_PROMPTS,
        prompts: json,
        receivedAt: Date.now()
    }
}

function requestRetorts(promptID) {
    return {
        type: REQUEST_RETORTS,
        promptID: promptID
    }
}

function receiveRetorts(promptID, json) {
    return {
        type: RECEIVE_RETORTS,
        promptID,
        retorts: json,
        receivedAt: Date.now()
    }
}

export function selectPrompt(promptID) {
    return {
        type: SELECT_PROMPT,
        promptID
    }
}

export function fetchPrompts() {
    return function (dispatch) {
        dispatch(requestPrompts());
        const url = `${API_URL}api/prompts`;
        return axios.get(url)
        .then(json => dispatch(receivePrompts(json.data)))
        .catch(error => dispatch(fetchPromptsFailure(error)))
    }
}

export function fetchRetorts(promptID) {
    return function (dispatch) {
        dispatch(requestRetorts(promptID));
        const url = `${API_URL}api/prompts/${promptID}/retorts`;
        return axios.get(url)
        .then(json => dispatch(receiveRetorts(promptID, json.data)))
        .catch(error => dispatch(fetchRetortsFailure(promptID, error)))
    }
}

export function createPrompt(promptText) {
    return function (dispatch) {
        const url = `${API_URL}api/prompts/`;

        return axios.post(url, {
            text: promptText, created_by: localStorage.id
        }, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(postPrompt(response.data)))
        .then(data => dispatch(selectPrompt(data.prompt.id)))
        .then(action => dispatch(fetchRetorts(action.promptID)))
        .then(() => dispatch(fetchPrompts()))
        .then(() => dispatch(newCurrPage(2)))
        .catch(error => dispatch(postPromptFailure(error)))
    }
}

export function createRetort(promptID, retortText) {
    return function (dispatch) {
        const url = `${API_URL}api/prompts/${promptID}/retorts/`;
        return axios.post(url, {
            text: retortText,
            created_by: localStorage.id
        }, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(postRetort(response.data)))
        .then(data => dispatch(fetchRetorts(data.retort.prompt_id)))
        .catch(error => dispatch(postRetortFailure(error)))
    }
}

export function editRetort(promptID, retortID, newText) {
    return function (dispatch) {
        const url = `${API_URL}api/prompts/${promptID}/retorts/${retortID}/?text=${newText}`;
        return axios.put(url, {}, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(putRetort(response.data)))
        .then(data => dispatch(fetchRetorts(data.retort.prompt_id)))
        .catch(error => dispatch(putRetortFailure(error)))
    }
}

export function editPrompt(promptID, newText) {
    return function (dispatch) {
        const url = `${API_URL}api/prompts/${promptID}/?text=${newText}`;
        return axios.put(url, {}, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(putPrompt(response.data)))
        .then(data => dispatch(selectPrompt(data.prompt.id)))
        .then(action => dispatch(fetchRetorts(action.promptID)))
        .then(() => dispatch(fetchPrompts()))
        .catch(error => dispatch(putPromptFailure(error)))
    }
}

function postPrompt (prompt) {
    return {
        type: POST_PROMPT,
        prompt: prompt
    }
}

function fetchPromptsFailure (error) {
    return {
        type: FETCH_PROMPTS_FAILURE,
        payload: { error },
        message: "no prompts"
    }
};

function postRetort (retort) {
    return {
        type: POST_RETORT,
        retort: retort
    }
}

function fetchRetortsFailure (promptID, error) {
    return {
        type: FETCH_RETORTS_FAILURE,
        payload: { error },
        message: `no match for "${promptID}"`,
        promptID
    }
};

function postPromptFailure (error) {
    return {
        type: POST_PROMPT_FAILURE,
        payload: { error },
        message: "failed to post prompt"
    }
}

function postRetortFailure (error) {
    return {
        type: POST_RETORT_FAILURE,
        payload: { error },
        message: "failed to post retort"
    }
}

function putPrompt (prompt) {
    return {
        type: PUT_PROMPT,
        prompt: prompt
    }
}

function putRetort (retort) {
    return {
        type: PUT_RETORT,
        retort: retort
    }
}

function putPromptFailure (error) {
    return {
        type: PUT_PROMPT_FAILURE,
        payload: { error },
        message: "put prompt failure"
    }
};

function putRetortFailure (error) {
    return {
        type: PUT_RETORT_FAILURE,
        payload: { error },
        message: "put retort failure"
    }
};

export function fetchLikes (promptID, retortID) {
    return function (dispatch) {
        dispatch(getLikes(retortID));
        const url = `${API_URL}api/prompts/${promptID}/retorts/${retortID}/likes`
        return axios.get(url)
          .then(response => dispatch(getLikesSuccess(response)))
          .catch(error => dispatch(getLikesFailure(error)))
    }
}

function getLikes (retortID) {
    return {
        type: GET_LIKES,
        retortID
    }
}
function getLikesSuccess (likes) {
    return {
        type: GET_LIKES,
        likes: likes
    }
}
function getLikesFailure (error) {
    return {
        type: GET_LIKES,
        payload: { error }
    }
}

function postLike () {
    return {
        type: POST_LIKE
    }
}

function postLikeSuccess (promptID, retortID, data) {
    return {
        type: POST_LIKE_SUCCESS,
        likes: data,
        promptID,
        retortID
    }
}

function postLikeFailure (error) {
    return {
        type: POST_LIKE_FAILURE,
        payload: { error },
        message: "post like failure"
    }
}

function deleteLike () {
    return {
        type: DELETE_LIKE
    }
}

function deleteLikeSuccess (promptID, retortID, data) {
    return {
        type: DELETE_LIKE_SUCCESS,
        likes: data,
        promptID,
        retortID
    }
}

function deleteLikeFailure (error) {
    return {
        type: DELETE_LIKE_FAILURE,
        payload: { error },
        message: "delete like failure"
    }
}

export function addLike(promptID, retortID) {
    return function (dispatch) {
        dispatch(postLike(promptID, retortID))
        const url = `${API_URL}api/prompts/${promptID}/retorts/${retortID}/likes`;
        return axios.post(url, {}, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(postLikeSuccess(promptID,retortID,response.data)))
        .catch(error => dispatch(postLikeFailure(error)))
    }
}

export function removeLike(promptID, retortID, likeID) {
    return function (dispatch) {
        dispatch(deleteLike(promptID, retortID, likeID))
        const url = `${API_URL}api/prompts/${promptID}/retorts/${retortID}/likes/${likeID}`;
        return axios.delete(url, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(response => dispatch(deleteLikeSuccess(promptID,retortID,response.data)))
        .catch(error => dispatch(deleteLikeFailure(error)))
    }
}



///////////////////////////////////////////////////////////////////////////////
// function shouldFetchPosts(state, subreddit) {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(subreddit) {
//   // Note that the function also receives getState()
//   // which lets you choose what to dispatch next.

//   // This is useful for avoiding a network request if
//   // a cached value is already available.

//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       // Dispatch a thunk from thunk!
//       return dispatch(fetchPosts(subreddit))
//     } else {
//       // Let the calling code know there's nothing to wait for.
//       return Promise.resolve()
//     }
//   }
// }