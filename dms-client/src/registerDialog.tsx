

import * as React from 'react';

// import * as PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

// import { withStyles } from '@material-ui/core/styles';

// const styles = (theme: any) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//         width: 200,
//     },
//     menu: {
//         width: 200,
//     },
// });

class RegisterDialog extends React.Component {

    // static propTypes = {
    //     classes: PropTypes.object.isRequired,
    // };  

    
    
    public state = {
        open: false,
    };

    public handleClickOpen = () => {
        this.setState({ open: true });
    };

    public handleClose = () => {
        this.setState({ open: false });
    };


    public render() {
        
        // const { classes } = this.props;

        return (
            <div>
                <Button onClick={this.handleClickOpen} color="inherit">Register</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="login-dialog-title"
                >
                    <DialogTitle id="login-dialog-title">Register</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            // className={classes.textField}

                        />
                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="lastName"
                            label="last Name"
                            type="text"
                            // className={classes.textField}

                        />
                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="text"
                            fullWidth={true}
                        />
                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="loginId"
                            label="LoginId"
                            type="text"
                            fullWidth={true}
                        />

                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth={true}
                        />
                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="conformPassword"
                            label="Password"
                            type="password"
                            fullWidth={true}
                        />
                        <TextField
                            autoFocus={true}
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="text"
                            fullWidth={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Register
                </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}



// export default withStyles(styles)(RegisterDialog);
export default RegisterDialog;
