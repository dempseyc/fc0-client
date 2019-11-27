import { fetchRetorts, fetchPrompts } from './contentActions'

export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const CREATE_SUBSCRIPTION = "CREATE_SUBSCRIPTION";


function receiveChat (message) {
    return {
        type: RECEIVE_CHAT,
        sender: message.sender,
        text: message.body
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