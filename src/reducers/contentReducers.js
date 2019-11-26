import { combineReducers } from 'redux'
import {
  SELECT_PROMPT,
  REQUEST_RETORTS,
  RECEIVE_RETORTS,
  REQUEST_PROMPTS,
  RECEIVE_PROMPTS,
  POST_PROMPT,
  POST_RETORT,
  POST_LIKE_SUCCESS,
  DELETE_LIKE_SUCCESS
} from '../actions/contentActions'

const initialState = {
    allPrompts: { isFetching: true, items: [] },
    retortsByPrompt: {isFetching: true},
    selectedPrompt: 1
  }

function selectedPrompt(state = initialState.selectedPrompt, action) {
  switch (action.type) {
    case SELECT_PROMPT:
      return action.promptID
    default:
      return state
  }
}

function allPrompts(
  state = initialState.allPrompts, action ) {
  switch (action.type) {
    case REQUEST_PROMPTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_PROMPTS:
      return {
        ...state,
        isFetching: false,
        items: action.prompts,
      }
    case POST_PROMPT:
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state
  }
}

function retorts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_RETORTS:
      return {
        ...state,
        items: action.retorts,
      }
    case POST_LIKE_SUCCESS:
    case DELETE_LIKE_SUCCESS:
      let retortIndex = state.items.findIndex( (retort) => retort.id===action.retortID );
      let retortsWithNewLikes = state.items.map((retort, i) => {
        if (i===retortIndex) {
          retort.likes = action.likes;
        }
        return retort;
      });
      return {
        ...state,
        items: retortsWithNewLikes
      }
    default:
      return state
  }
}

function retortsByPrompt(state = initialState.retortsByPrompt, action) {
  if (action.promptID) {
    switch (action.type) {
      case REQUEST_RETORTS:
        return {
          ...state,
          isFetching: true
        }
      case RECEIVE_RETORTS:
        return {
          ...state,
          isFetching: false,
          [action.promptID]: retorts(state[action.promptID], action)
        }
      case POST_RETORT: 
        return {
          ...state,
          isFetching: true
        }
      case POST_LIKE_SUCCESS:
      case DELETE_LIKE_SUCCESS:
        return {
          ...state,
          [action.promptID]: retorts(state[action.promptID], action)
        }
      default:
        return state
    }
  } else { return state; }
}

const contentReducer = combineReducers({
  allPrompts,
  selectedPrompt,
  retortsByPrompt
});

export default contentReducer