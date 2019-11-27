import { RECEIVE_CHAT } from '../actions/cableActions'

const initialState = {
    items: []
}

function cableReducer(state=initialState, action) {
    switch (action.type) {
        case RECEIVE_CHAT:
            return {
                ...state,
                items: [...state.items, action.message]
            }
        default:
            return state;
    }
}

export default cableReducer