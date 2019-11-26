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
                if (tags[0] === 'retorts') {
                    dispatch(fetchRetorts(tags[1]));
                } else if (tags[0] === 'prompts') {
                    dispatch(fetchPrompts());
                } else {
                    break;
                }
            case 'chat':
                dispatch(receiveChat(message));
            default:
                break;
        }
    }

}