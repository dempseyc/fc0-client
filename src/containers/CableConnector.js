import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActionCable from 'action-cable-react-jwt';

class CableConnector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        }
    }

    ComponentDidMount () {
        this.cable = ActionCable.createConsumer("ws://localhost:3001/cable", localStorage.token);
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