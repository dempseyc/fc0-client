import { RECEIVE_CHAT } from '../actions/messageActions'

const initialState = {
    items: []
}

function messageReducer(state=initialState, action) {
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

export default messageReducer