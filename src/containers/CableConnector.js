import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActionCable from 'action-cable-react-jwt'

import { CABLE_URL } from '../actions/API_URL'

class CableConnector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        }
    }

    ComponentDidMount () {
        this.cable = ActionCable.createConsumer(CABLE_URL, localStorage.token);
            this.subscription = this.cable.subscriptions.create({channel: "MyChannel"}, {
                connected: this.onConnect },             // onConnect
                disconnected: this.onDisconnect },       // onDisconnect
                received: (data) => {
                    this.props.dispatch(handleReceived(data));
                    console.log("cable received: ", data); 
                    }
            });
    }

    ComponentWillUnmount () {
        this.cable.subscriptions.remove(this.subscription);
    }

    render () {
        return (
            <CableIndicator status={this.state.connected} />
        )
    }

}

export default connect(mapStateToProps)(App);