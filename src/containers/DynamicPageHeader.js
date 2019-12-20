import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { connectCable, unsubscribe } from '../actions/cableActions';

const DynamicPageHeader = (props) => {

    const logoutButton = () => (
        <Button onClick={()=> {
            props.dispatch(logoutUser(props.username));
            // props.dispatch(unsubscribe(props.cable,props.subscription));
            // props.dispatch(connectCable());
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
            <div className='PageHeader-span'>{userPageHeaderDetails.text}</div>
            {props.loggedIn ? userPageHeaderDetails.button() : null}
        </div>
    );
}

const mapStateToProps = state => ({
    username: state.userReducer.user.username,
    cable: state.cableReducer.cable,
    subscription: state.cableReducer.subscription
});

export default connect(mapStateToProps)(DynamicPageHeader)