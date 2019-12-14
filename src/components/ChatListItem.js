import React from 'react'
import FCTextItem from '../components/FCTextItem'

const ChatListItem = (props) => {
    const { username, text, i, id } = props;
    return (
        <div key={i} className='chat-list-item'>
            <FCTextItem 
                type='Username'
                id={id} 
                text={username+': '} 
                key={`name-${i}`} 
                classes={['chat-name']} />
            <span key={`text-${i}`} className='chat-text'>{text}</span>
        </div>
    );
};

export default ChatListItem;