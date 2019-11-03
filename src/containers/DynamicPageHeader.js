import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const DynamicPageHeader = (props) => {

    const logoutButton = () => (
        <Button onClick={()=> props.dispatch(logoutUser(props.username))} variant='contained' color='primary'>
            LOG OUT
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
    username: state.userReducer.user.username
});

export default connect(mapStateToProps)(DynamicPageHeader)