import React, { Component } from 'react';

class FCUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleChangeUN = this.handleChangeUN.bind(this);
        this.handleChangeEM = this.handleChangeEM.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
        this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUN(event) {
        this.setState({username: event.target.value});
    }

    handleChangeEM(event) {
        this.setState({email: event.target.value});
    }
  
    handleChangePW(event) {
        this.setState({password: event.target.value});
    }

    handleSubmitUsername() {
        this.props.submitUsername(this.state.username);
    }

    handleSubmitPassword() {
        this.props.submitPassword(this.state);
    }

    handleSubmitCreate() {
        this.props.submitUserCreate(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        (this.props.createMode) ? this.handleSubmitCreate() : this.handleSubmitPassword();
    } 
  
    render() {
        console.log('render of user form');
        const emailInput = (this.props.createMode) ? (<label>
            email:
            <input type="text" value={this.state.email} onChange={this.handleChangeEM}/>
            </label>) : null;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                username:
                <input type="text" value={this.state.username} onChange={this.handleChangeUN} onBlur={this.handleSubmitUsername}/>
                </label>
                <label>
                password:
                <input type="text" value={this.state.password} onChange={this.handleChangePW} />
                </label>
                {emailInput}
                <input type="submit" value="Submit" />
            </form>
        );
    }

}

export default FCUserForm
