import React, { Component } from 'react';

class FCChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.handleChangeTXT = this.handleChangeTXT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeTXT(event) {
        this.setState({text: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmitChat(this.state.text);
        this.setState({text: ''});
    } 
  
    render() {
        return (
            <form className="chat-form" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.text} onChange={this.handleChangeTXT}/>
                <input type="submit" value="->" />
            </form>
        )
    }

}

export default FCChatForm