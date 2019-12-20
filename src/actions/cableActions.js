import { fetchRetorts, fetchPrompts, invalidateRetorts } from './contentActions'

import ActionCable from 'action-cable-react-jwt'

import { CABLE_URL } from './API_URL'

export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const HANDLE_CONNECTED = "HANDLE_CONNECTED";
export const HANDLE_DISCONNECTED = "HANDLE_DISCONNECTED";
export const STORE_SUBSCRIPTION = "STORE_SUBSCRIPTION";
export const STORE_CABLE = "STORE_CABLE";


export function afterConnect (subscription, username) {
    return (dispatch) => {
        dispatch(storeSubscription(subscription));
        // also doesn't work without dispatch
        // dispatch(broadcastChat(subscription,"HI!",username));
    }
}

// function onDisconnect (subscription, username) {
//     return (dispatch) => {
// 		dispatch(broadcastChat(subscription,"BYE!",username));
// 		dispatch(handleDisconnected());
//     }
// }

export function connectCable (username) {
    return (dispatch) => {
        let cable = ActionCable.createConsumer(CABLE_URL, localStorage.token);
        let subscription = cable.subscriptions.create({channel: "MyChannel"}, {
            connected: dispatch(handleConnected()),             // onConnect
            disconnected: dispatch(handleDisconnected()),       // onDisconnect
            received: (data) => {
                dispatch(handleReceived(data, username));
                console.log("cable received: ", data);
                },
        });
        dispatch(storeSubscription(subscription));
        dispatch(afterConnect(subscription,username));
        // work here?
        dispatch(broadcastChat(subscription,"HI!",username));
    }
    // console.log("channell", JSON.parse(this.subscription.identifier).channel);
}

export function unsubscribe (cable, subscription) {
    cable.subscriptions.remove(subscription);
}

function receiveChat (message) {
    return {
        type: RECEIVE_CHAT,
        message: message
    }
}

function handleConnected () {
    return {
        type: HANDLE_CONNECTED
    }
}

function handleDisconnected() {
    return {
        type: HANDLE_DISCONNECTED
    }
}

export function storeCable (cable) {
    return {
        type: STORE_CABLE,
        cable: cable
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
                    dispatch(invalidateRetorts(tags[1]));
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
        // not sending when called from afterConnect... something async
        // console.log('subscription', subscription);
        subscription.send(params);
        // dispatch({type: 'SENT_CHAT_MESSAGE', payload: params });
    }
}