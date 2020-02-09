import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import ChatList from '../components/ChatList'
import FCChatForm from '../components/FCChatForm'

import { broadcastChat } from '../actions/cableActions'

class FoamyPage extends Component {

    handleSubmitChat (text) {
        const {subscription, user} = this.props;
        this.props.dispatch(broadcastChat(subscription,text,user));
    }

    render (props) {
        const {chatItems, userTable} = this.props;
        return (
            <div className='foamy'>
                <FCChatForm handleSubmitChat={this.handleSubmitChat.bind(this)} />
                <ChatList items={chatItems} userTable={userTable} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    userTable: state.userReducer.users,
    chatItems: state.cableReducer.items,
    subscription: state.cableReducer.ChatChannel.subscription
});

export default connect(mapStateToProps)(FoamyPage);