import { 
    RECEIVE_CHAT,
    STORE_SUBSCRIPTION,
    STORE_CABLE,
    UNSUBSCRIBE
} from '../actions/cableActions'

const initialState = {
    cable: null,
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
        case STORE_CABLE:
            return {
                ...state,
                cable: action.cable
            }
        case STORE_SUBSCRIPTION:
            return {
                ...state,
                subscription: action.subscription
            }
        case UNSUBSCRIBE:
            if (state.cable && state.subscription) {
                state.cable.subscriptions.remove(state.subscription);
            }
            return {
                ...state,
                initialState
            }
        default:
            return state;
    }
}

export default cableReducer