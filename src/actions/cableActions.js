import { fetchRetorts, fetchPrompts } from './contentActions'

export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const HANDLE_CONNECTED = "HANDLE_CONNECTED";
export const HANDLE_DISCONNECTED = "HANDLE_DISCONNECTED";
export const STORE_SUBSCRIPTION = "STORE_SUBSCRIPTION";


function receiveChat (message) {
    return {
        type: RECEIVE_CHAT,
        message: message
    }
}

export function handleConnected () {
    return {
        type: HANDLE_CONNECTED
    }
}

export function handleDisconnected() {
    return {
        type: HANDLE_DISCONNECTED
    }
}

export function storeSubscription (subscription) {
    return {
        type: STORE_SUBSCRIPTION,
        subscription: subscription
    }
}

export function handleReceived (message, myname) {
    return function (dispatch) {
        switch (message.meta) {
            case 'revalidate':
                let tags = message.body.split(" ");
                if (tags.length === 2 && message.sender !== myname) {
                    dispatch(fetchRetorts(tags[1]));
                } else if (message.sender !== myname) {
                    dispatch(fetchPrompts());
                }
                break;
            case 'chat':
                dispatch(receiveChat(message));
            default:
                break;
        }
    }
}

export function broadcastChat (subscription, message, myname) {
    return function (dispatch) {
        const params = { meta: "chat", body: message, sender: myname }
        subscription.send(params);
        dispatch({type: 'SENT_CHAT_MESSAGE', payload: params });
    }
}