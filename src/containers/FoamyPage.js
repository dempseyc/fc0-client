import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import ChatList from '../components/ChatList'
import FCChatForm from '../components/FCChatForm'

import { broadcastChat } from '../actions/cableActions'

class FoamyPage extends Component {

    handleSubmitChat (text) {
        const {subscription, username} = this.props;
        this.props.dispatch(broadcastChat(subscription,text,username));
    }

    render (props) {
        const {chatItems, userTable} = this.props;
        return (
            <div className='foamy'>
                <ChatList items={chatItems} userTable={userTable} />
                <FCChatForm handleSubmitChat={this.handleSubmitChat.bind(this)} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    username: state.userReducer.user.username,
    userTable: state.userReducer.users,
    chatItems: state.cableReducer.items,
    subscription: state.cableReducer.subscription
});

export default connect(mapStateToProps)(FoamyPage);