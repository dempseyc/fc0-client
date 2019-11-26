import { fetchRetorts, fetchPrompts } from './contentActions'

export const RECEIVE_CHAT = "RECEIVE_CHAT";

function receiveChat (message) {
    return {
        type: RECEIVE_CHAT,
        sender: message.sender,
        text: message.body
    }
}

export function handleReceived (message) {
    return function (dispatch) {
        switch (message.meta) {
            case 'revalidate':
                let tags = message.body.split(" ");
                if (tags.length === 2) {
                    dispatch(fetchRetorts(tags[1]));
                } else {
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