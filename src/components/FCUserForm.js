import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FCUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollTo: 0,
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

        // this.scrollTo = this.scrollTo.bind(this);
    }

    scrollTo(node) {
        node.scrollIntoView();
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
        this.setState({
            scrollTo: this.state.scrollTo+1
        })
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

    // componentDidMount() {
    //     const scrollTos = (this.props.createMode) ? ['un','em','pw'] : ['un','pw']
    //     const node = document.getElementById(scrollTos[this.state.scrollTo])
    //     this.scrollTo(node);
    // }

    // componentDidUpdate() {
    //     const scrollTos = (this.props.createMode) ? ['un','em','pw'] : ['un','pw']
    //     const node = document.getElementById(scrollTos[this.state.scrollTo])
    //     this.scrollTo(node);
    // }
  
    render() {
        console.log('render of user form');
        if (this.props.serverOnline) {
            const emailInput = (this.props.createMode) ? (<label>
                email:
                <input type="text" value={this.state.email} onChange={this.handleChangeEM}/>
                </label>) : null;
            return (
                <div className="user-form">
                    <form onSubmit={this.handleSubmit}>
                        <label id='un'>
                        username:
                        <input type="text" value={this.state.username} onChange={this.handleChangeUN} onBlur={this.handleSubmitUsername}/>
                        </label>
                        {emailInput}
                        <label id='pw'>
                        password:
                        <input type="text" value={this.state.password} onChange={this.handleChangePW} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        } else {
            return (
                <div>Server Offline</div>
            )
        }
    }

}

export default FCUserForm
