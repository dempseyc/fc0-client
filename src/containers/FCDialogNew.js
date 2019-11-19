import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class FCDialogNew extends React.Component {

    constructor (props) {
        super(props);
        this.submit = (text) => { this.props.submit(text) };
        switch(this.type) {
            case 'Prompt':
                this.color = 'primary';
                break;
            case 'Retort':
                this.color = 'secondary';
                break;
            case 'Disabled':
                this.color = 'default';
                break;
            default:
                break;
        }
        this.placeholder = this.props.placeholder;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmitAndClose = this.handleSubmitAndClose.bind(this);
        // this.buttonText = (this.props.loggedIn) ? '+' : '+ sign in to post +';
        // this.onClickCb = (this.props.loggedIn) ? this.handleOpen : this.props.goToLogin;
        this.state = { 
            open: false
        };
    }

    onTextChange (e) {
        this.setState({ value: e.target.value });
    }

    handleOpen () {
        this.setState({ open: true });
    };

    handleClose () {
        this.setState({ open: false,
        value: "" });
    };

    handleSubmitAndClose (text) {
        if (text !== undefined && text !== '') {
            this.submit(text);
        }
        this.handleClose();
    }

    render() {
        switch(this.props.type) {
            case 'Prompt':
                this.color = 'primary';
                break;
            case 'Retort':
                this.color = 'secondary';
                break;
            case 'Disabled':
                this.color = 'default';
                break;
            default:
                break;
        }
        return (
        <div>
            <Button
                variant='contained'
                color={this.color}
                onClick={(this.props.loggedIn) ? this.handleOpen : this.props.goToLogin}
                fullWidth={true}
                size='large'
            >
            {(this.props.loggedIn) ? '+' : '+ sign in to post +'}
            </Button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
                fullWidth={true}
            >
            <DialogContent>
                <TextField
                    value={this.state.value}
                    onChange={ (e) => this.setState({ value: e.target.value }) }
                    placeholder={this.placeholder}
                    multiline={true}
                    autoFocus
                    margin='dense'
                    id='prompt'
                    // label={`new ${this.type}`}
                    type='text'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                cancel
                </Button>
                <Button onClick={ () => { this.handleSubmitAndClose(this.state.value) } } color='primary'>
                dispense
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}

export default FCDialogNew;