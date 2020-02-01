import React, { Component } from 'react';

const refs = {};

const EmailForm = (props) => {
    const ref = React.createRef();
    refs.em = ref;
    return(
        (props.createMode) ? (<form ref={ref} onSubmit={props.handleSubmitEmail}><label>
                email:
                <input type="text" value={props.email} onChange={props.handleChangeEM} onFocus={()=>props.setFocus(ref)} />
            </label>
            <input type="submit" value="Submit" hidden={true}/>
            </form>) : null
    )
}

const UserNameForm = (props) => {
    const ref = React.createRef();
    refs.un = ref;
    return (<form ref={ref} onSubmit={props.handleSubmitUsername}><label>
        username:
        <input type="text" value={props.username} onChange={props.handleChangeUN} onBlur={props.handleSubmitUsername} onFocus={()=>props.setFocus(ref)}/>
    </label>
    <input type="submit" value="Submit" hidden={true}/>
    </form>)
}

const PasswordForm = (props) => {
    const ref = React.createRef()
    refs.pw = ref;
    return (<form  ref={ref} onSubmit={props.handleSubmit}>
    <label>
        password:
        <input type="text" value={props.password} onChange={props.handleChangePW} onFocus={()=>props.setFocus(ref)}/>
    </label>
    <input type="submit" value="Submit" />
    </form>);
}

class FCCarouUserForm extends Component {
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

        this.setFocus = this.setFocus.bind(this);
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

    handleSubmitUsername(event) {
        event.preventDefault();
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

    setFocus(ref) {
        ref.current.scrollIntoView()
    }
  
    render() {
        console.log('render of user form');
        if (this.props.serverOnline) {

            return (
                <div className="carou-user-form">
                    <UserNameForm
                        setFocus={this.setFocus}
                        username={this.state.username}
                        handleChangeUN={this.handleChangeUN}
                        handleSubmitUsername={this.handleSubmitUsername}
                    />
                    <EmailForm
                        setFocus={this.setFocus}
                        createMode={this.props.createMode}
                        email={this.state.email}
                        handleChangeEM={this.handleChangeEM}
                        handleSubmitEmail={this.handleSubmitEmail}
                    />
                    <PasswordForm
                        setFocus={this.setFocus}
                        password={this.state.password}
                        handleChangePW={this.handleChangePW}
                        handleSubmitPassword={this.handleSubmitPassword}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            );
        } else {
            return (
                <div>Server Offline</div>
            )
        }
    }

}

export default FCCarouUserForm
