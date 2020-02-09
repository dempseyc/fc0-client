import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import FCCarouUserForm from '../components/FCCarouUserForm'
import UserDetails from '../components/UserDetails'
import { loginUser, 
 createUser } from '../actions/userActions'
// import { subscribe } from '../actions/cableActions'

class UserPage extends Component {

    messageList(messages) {
        const messageArray = messages.toString().split(',');
        return messageArray.map( (msg,i) => <div key={i} className='message'>{msg}</div> );
    }

    submitPassword (credentials) {
        this.props.dispatch(loginUser(credentials));
    }

    submitUserCreate (credentials) {
        this.props.dispatch(createUser(credentials));
    }

    contentLoading () {
        return <Loading contentName={this.pageName}/>
    }

    render () {
        const { messages, user, username, serverOnline, credentials} = this.props;
        const ready = (messages[0] === 'ready');
        const createMode = (credentials.username !== '' && credentials.password !== '') ? user.notFound : false ;
        const loginForm = (
            <FCCarouUserForm
                createMode={false}
                submitPassword={this.submitPassword.bind(this)} 
                serverOnline={serverOnline}
                credentials={credentials}
            />
        )
        const createForm = (
            <FCCarouUserForm 
                createMode={true}
                submitUserCreate={this.submitUserCreate.bind(this)}
                serverOnline={serverOnline}
                credentials={credentials}
            />
        )
        const userForm = (createMode) ? createForm : loginForm ;
        return (
            <div className={'user'}>
                {(ready) ? <UserDetails user={user}/> : userForm}
                {/* start fetching data for user instead of null */}
                {(ready) ? null : this.messageList(messages)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usernames: state.userReducer.users,
    username: state.userReducer.user.username,
    user: state.userReducer.user,
    serverOnline: state.contentReducer.allPrompts.serverOnline,
    credentials: state.userReducer.user.credentials,
    messages: state.userReducer.messages,
    cable: state.cableReducer.cable
});

export default connect(mapStateToProps)(UserPage)