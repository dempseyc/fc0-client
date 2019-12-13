import React, { Component } from 'react'
import ChatListItem from '../components/ChatListItem'

class ChatList extends Component {

    render (props) {
        const { items } = this.props;
        console.log('items', items);
        if (items.length>0) {
            return items.map( (item,i) => {
                return (<ChatListItem key={i} i={i} username={item.sender} text={item.body} />)
            });
        } else {
            return <div>...</div>
        }
    }

}

export default ChatList;