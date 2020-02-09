import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';

const LoginTab = (props) => (
    <Button 
        onClick={
            props.onClick
            } variant={props.selected ? 'outlined' : 'text'} color='primary' >
            
        SIGN IN
    </Button>
);

const NewTab = (props) => (
    <Button 
        onClick={
            props.onClick
            } variant={props.selected ? 'outlined' : 'text'} color='secondary' >
        NEW USER
    </Button>
);

const FormHeader = (props) => {
    // const header = (props.createMode) ? `create user ${props.desiredUN}?` : `welcome back`;
    return (
        <div className="form-header">
        <LoginTab 
            onClick={() => props.setMode(false)}
            selected={!props.createMode}
        />
        <NewTab 
            onClick={() => props.setMode(true)}
            selected={props.createMode}
        />
        {/* <header>{header}</header> */}
        </div>
    )
}

const FormTabs = (props) => {

    let tabs = [];

    const handleClick = (ref,stringname) => {
        props.setFocus(ref,stringname)
    }

    let refs = {
        username: props.UNinputRef,
        password: props.PWinputRef
    }

    if (props.createMode) {
            refs = {
            username: props.UNinputRef,
            email: props.EMinputRef,
            password: props.PWinputRef
        }
    }

    for (let key in refs) {
        let classes = ['form-tab'];
        if (key === props.isFocus) { classes.push('focus')}
        let li = <li 
            key={key}
            className={classes.join(' ')}
            onClick={()=>handleClick(refs[key],`${key}`)}
            >
                {`${key}:`}
            </li>
        ;
        tabs.push(li)
    }

    return (<ul className='form-tabs'>{tabs}</ul>);
}

const EmailForm = (props) => {
    return(
        (props.createMode) ? (<form onSubmit={props.handleSubmitEmail}><label>
                <input ref={props.EMinputRef} type="text" value={props.email} onChange={props.handleChangeEM} onFocus={()=>props.setFocus(props.EMinputRef, 'email')} />
            </label>
            </form>) : null
    )
}

const UserNameForm = (props) => {
    return (<form onSubmit={props.handleSubmitUsername}><label>
        <input ref={props.UNinputRef} type="text" value={props.username} onChange={props.handleChangeUN} onFocus={()=>props.setFocus(props.UNinputRef, 'username')} />
    </label>
    </form>)
}

const PasswordForm = (props) => {
    return (<form onSubmit={(props.createMode)?props.handleSubmitCreate:props.handleSubmitPassword}><label>
        <input ref={props.PWinputRef} type="text" value={props.password} onChange={props.handleChangePW} onFocus={()=>props.setFocus(props.PWinputRef, 'password')} />
    </label>
    <input type="submit" value="Submit" />
    </form>);
}

class FCCarouUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: this.props.createMode,
            isFocus: (this.props.createMode)? 'email' : 'username',
            username: '',
            email: '',
            password: ''
        };
        this.handleChangeUN = this.handleChangeUN.bind(this);
        this.handleChangeEM = this.handleChangeEM.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);

        this.EMinputRef = React.createRef();
        this.UNinputRef = React.createRef();
        this.PWinputRef = React.createRef();

        this.setFocus = this.setFocus.bind(this);
        this.setMode = this.setMode.bind(this);
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

    handleSubmitPassword(event) {
        event.preventDefault();
        this.props.submitPassword(this.state);
    }

    handleSubmitCreate(event) {
        event.preventDefault();
        this.props.submitUserCreate(this.state);
    }

    setFocus(ref, stringname) {
        ref.current.form.scrollIntoView({behavior: 'smooth'})
        ref.current.focus()
        this.setState({
            isFocus: stringname
        })
    }

    setMode(createMode) {
        this.setState({
            createMode: createMode
        })
    }

    render() {
        const { createMode, credentials } = this.props;

        if (this.props.serverOnline) {
            return (
                <div className="carou-user-form-and-tabs">
                    <FormHeader 
                        desiredUN={credentials.username}
                        createMode={this.state.createMode}
                        setMode={this.setMode}
                    />
                    <FormTabs
                        EMinputRef={this.EMinputRef}
                        UNinputRef={this.UNinputRef}
                        PWinputRef={this.PWinputRef}
                        isFocus={this.state.isFocus}
                        setFocus={this.setFocus}
                        createMode={this.state.createMode}
                        username={credentials.username}
                    />
                    <div className="carou-user-form">
                        <UserNameForm
                            EMinputRef={this.EMinputRef}
                            UNinputRef={this.UNinputRef}
                            PWinputRef={this.PWinputRef}
                            setFocus={this.setFocus}
                            createMode={this.state.createMode}
                            username={this.state.username}
                            handleChangeUN={this.handleChangeUN}
                            handleSubmitUsername={this.handleSubmitUsername}
                        />
                        <EmailForm
                            EMinputRef={this.EMinputRef}
                            setFocus={this.setFocus}
                            createMode={this.state.createMode}
                            email={this.state.email}
                            handleChangeEM={this.handleChangeEM}
                            handleSubmitEmail={this.handleSubmitEmail}
                        />
                        <PasswordForm
                            PWinputRef={this.PWinputRef}
                            setFocus={this.setFocus}
                            createMode={this.state.createMode}
                            password={this.state.password}
                            handleChangePW={this.handleChangePW}
                            handleSubmitPassword={this.handleSubmitPassword}
                            handleSubmitCreate={this.handleSubmitCreate}
                        />
                    </div>
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
