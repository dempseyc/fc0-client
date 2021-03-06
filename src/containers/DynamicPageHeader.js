import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { removeToken } from '../actions/userActions';
import { unsubscribe } from '../actions/cableActions';

const DynamicPageHeader = (props) => {

    const logoutButton = () => (
        <Button onClick={()=> {
            props.dispatch(removeToken(props.username));
            props.dispatch(unsubscribe('ChatChannel'));
                }} variant='contained' color='primary'>
            SIGN OUT
        </Button>
    );

    const userPageHeaderDetails = {
        text: props.username,
        button: logoutButton
    };

    return (
        <div className='PageHeader'>
            {props.loggedIn ? <div className='PageHeader-span'>{userPageHeaderDetails.text}</div> : null}
            {props.loggedIn ? userPageHeaderDetails.button() : null}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.userReducer.user.loggedIn,
    username: state.userReducer.user.username,
    cable: state.cableReducer.cable,
    subscription: state.cableReducer.subscription
});

export default connect(mapStateToProps)(DynamicPageHeader)