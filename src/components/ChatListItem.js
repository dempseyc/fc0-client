import React from 'react';

const ChatListItem = (props) => {
    const { username, text, i } = props;
    return (
        <div key={i} className='chat-list-item'>
            <span key={`name-${i}`} className='chat-name'>{username}</span>
            <span key={`text-${i}`} className='chat-text'>{text}</span>
        </div>
    );
};

export default ChatListItem;