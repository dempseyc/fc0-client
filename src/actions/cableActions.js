import { fetchRetorts, fetchPrompts, invalidateRetorts } from './contentActions'
import { newCurrPage } from './viewsActions'

import ActionCable from 'action-cable-react-jwt'

import { CABLE_URL } from './API_URL'

export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const HANDLE_CONNECTED = "HANDLE_CONNECTED";
export const HANDLE_DISCONNECTED = "HANDLE_DISCONNECTED";
export const STORE_SUBSCRIPTION = "STORE_SUBSCRIPTION";
export const STORE_CABLE = "STORE_CABLE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export function connectCable () {
    return (dispatch) => {
        let cable = ActionCable.createConsumer(CABLE_URL, localStorage.token);
        dispatch(storeCable(cable))
    }
    // console.log("channell", JSON.parse(this.subscription.identifier).channel);
}

export function subscribe (channel,cable,username) {
    return (dispatch) => {
        let subscription = cable.subscriptions.create({channel: channel}, {
            connected: dispatch(handleConnected(channel)),             // onConnect
            disconnected: dispatch(handleDisconnected(channel)),       // onDisconnect
            received: (data) => {
                dispatch(handleReceived(data, username));
                console.log("cable received: ", data);
                },
        });
        dispatch(storeSubscription(subscription,channel));
    }
}

export function unsubscribe (channel) {
    return {
        type: UNSUBSCRIBE,
        channel
    }
}

function receiveChat (message) {
    return {
        type: RECEIVE_CHAT,
        message: message
    }
}

function handleConnected (channel) {
    return {
        type: HANDLE_CONNECTED,
        channel: channel
    }
}

function handleDisconnected(channel) {
    return {
        type: HANDLE_DISCONNECTED,
        channel: channel
    }
}

export function storeCable (cable,channel) {
    return {
        type: STORE_CABLE,
        cable: cable,
        channel: channel
    }
}

export function storeSubscription (subscription,channel) {
    return {
        type: STORE_SUBSCRIPTION,
        subscription: subscription,
        channel: channel
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

export function broadcastChat (subscription, message, user) {
    return function (dispatch) {
        if (user.loggedIn) {
            const params = { meta: "chat", body: message, sender: user.username }
            // not sending when called from afterConnect... something async
            // console.log('subscription', subscription);
            //// CHAT DISABLED
            subscription.send(params);
            // dispatch(handleReceived({meta:"chat", body:"sorry, chat temporarily disabled",sender:"ERROR"}));
            //// // CHAT DISABLED
            // dispatch({type: 'SENT_CHAT_MESSAGE', payload: params });
        } else {
            dispatch(handleReceived({meta:"chat", body:"must login to chat",sender:"ERROR"}));
            // dispatch(newCurrPage(0,3));
        }
    }
}