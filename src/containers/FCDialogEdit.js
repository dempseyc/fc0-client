import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class FCDialogEdit extends React.Component {

    constructor (props) {
        super(props);
        this.submit = (text) => { this.props.submit(text) };
        this.type = this.props.type;
        this.placeholder = this.props.placeholder;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmitAndClose = this.handleSubmitAndClose.bind(this);
        this.state = { 
            open: false,
            value: this.props.item ? this.props.item.text : ""
        };

    }

    onTextChange (e) {
        this.setState({ value: e.target.value });
    }

    handleOpen () {
        this.setState({ open: true });
    }

    handleClose () {
        this.setState({ open: false });
    }

    handleSubmitAndClose (text) {
        if (text !== undefined && text !== '') {
            this.submit(text);
        }
        this.setState({ open: false });
    }

    render({ item,classes,button } = this.props) {
        return (
        <div>
            {button(this)}
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
                    // id='prompt'
                    label={`edit ${this.type}`}
                    type='text'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                cancel
                </Button>
                <Button onClick={ () => { this.handleSubmitAndClose(this.state.value) } } color='primary'>
                submit edit
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}

export default FCDialogEdit;