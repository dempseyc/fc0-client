import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import FCCarouUserForm from '../components/FCCarouUserForm'
import UserDetails from '../components/UserDetails'
import { loginUser, findUser, createUser } from '../actions/userActions'

class UserPage extends Component {

    messageList(messages) {
        const messageArray = messages.toString().split(',');
        return messageArray.map( (msg,i) => <div key={i} className='message'>{msg}</div> );
    }

    submitUsername (username) {
        if (username) {
            this.props.dispatch(findUser(username, this.props.usernames));
        }
    }

    submitPassword (details) {
        this.props.dispatch(loginUser(details));
    }

    submitUserCreate (details) {
        this.props.dispatch(createUser(details));
    }

    contentLoading () {
        return <Loading contentName={this.pageName}/>
    }

    render () {
        const { messages, user, username, serverOnline } = this.props;
        const ready = (messages[0] === 'ready');
        const userForm = (
            <FCCarouUserForm 
                submitUsername={this.submitUsername.bind(this)}
                submitPassword={this.submitPassword.bind(this)} 
                submitUserCreate={this.submitUserCreate.bind(this)}
                serverOnline={serverOnline}
                createMode={ (username !== '') ? !user.found : true }
            />
        )
        return (
            <div className={'user'}>
                {(ready) ? null : this.messageList(messages)}
                {(ready) ? <UserDetails user={user}/> : userForm}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usernames: state.userReducer.users,
    username: state.userReducer.user.username,
    user: state.userReducer.user,
    messages: state.userReducer.messages,
    serverOnline : state.userReducer.serverOnline
});

export default connect(mapStateToProps)(UserPage)