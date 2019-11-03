import React, { Component } from 'react';
import { connect } from 'react-redux';
// import '../styles/SwiperPage.css';
import Loading from '../components/Loading';
import FCUserForm from '../components/FCUserForm';
import UserDetails from '../components/UserDetails';
import { loginUser, findUser, createUser } from '../actions/userActions';

class UserPage extends Component {

    messageList(messages) {
        const messageArray = messages.toString().split(',');
        return messageArray.map( (msg,i) => <div key={i} className='message'>{msg}</div> );
    }

    submitUsername (username) {
        this.props.dispatch(findUser(username, this.props.usernames));
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
        const { messages, user, username } = this.props;
        const ready = (messages[0] === 'ready');
        // console.log(username, 'username');
        const userForm = (
            <FCUserForm 
                submitUsername={this.submitUsername.bind(this)}
                submitPassword={this.submitPassword.bind(this)} 
                submitUserCreate={this.submitUserCreate.bind(this)}
                createMode={ username ? (username.split(' ')[0] === 'enter') : true }
            />
        )
        return (
            <div className={'user'}>
                {(ready) ? <UserDetails user={user}/> : userForm}
                {(ready) ? null : this.messageList(messages)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usernames: state.userReducer.users,
    username: state.userReducer.user.username,
    user: state.userReducer.user,
    messages: state.userReducer.messages
});

export default connect(mapStateToProps)(UserPage)