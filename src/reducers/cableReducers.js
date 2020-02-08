import { 
    RECEIVE_CHAT,
    STORE_SUBSCRIPTION,
    STORE_CABLE,
    UNSUBSCRIBE
} from '../actions/cableActions'

const initialState = {
    MyChannel: {
        cable: null,
        subscription: null,
    },
    ChatChannel: {
        cable: null,
        subscription: null,
    },
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
                [action.channel]: {
                    ...state[action.channel],
                    cable: action.cable
                }
            }
        case STORE_SUBSCRIPTION:
            return {
                ...state,
                [action.channel]: {
                    ...state[action.channel],
                    subscription: action.subscription
                }
            }
        case UNSUBSCRIBE:
            if (state[action.channel].cable && state[action.channel].subscription) {
                state[action.channel].cable.subscriptions.remove(state[action.channel].subscription);
            }
            return {
                ...state,
                [action.channel]: {
                    ...state[action.channel].initialState
                }
            }
        default:
            return state;
    }
}

export default cableReducer