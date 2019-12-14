import React, { Component } from 'react'
import ChatListItem from '../components/ChatListItem'

class ChatList extends Component {

    scrollToBottom () {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
    this.scrollToBottom();
    }

    componentDidUpdate() {
    this.scrollToBottom();
    }

    chatListEmpty () {
        return (
        <div className='chat-list-item'>...</div>
        )
    };
    
    chatListItems (items,userTable) {
        return items.map( (item,i) => {
            return (
                <ChatListItem 
                    key={i} 
                    i={i} 
                    id={userTable[item.sender]}
                    username={item.sender} 
                    text={item.body} 
                />
            )
        });
    }

    render (props) {
        const { items, userTable } = this.props;

        const list = (items.length>0) ? this.chatListItems(items,userTable) : this.chatListEmpty() ;
        console.log('items', items);
        return (
            <div className='chat-list'>
                {list}
                <div 
                    style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }

}

export default ChatList;