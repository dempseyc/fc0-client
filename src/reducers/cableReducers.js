import { 
    RECEIVE_CHAT,
    STORE_SUBSCRIPTION
} from '../actions/cableActions'

const initialState = {
    subscription: null,
    items: []
}

function cableReducer(state=initialState, action) {
    switch (action.type) {
        case RECEIVE_CHAT:
            return {
                ...state,
                items: [...state.items, action.message]
            }
        case STORE_SUBSCRIPTION:
            return {
                ...state,
                subscription: action.subscription
            }
        default:
            return state;
    }
}

export default cableReducer